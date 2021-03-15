import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { BotsService } from 'src/bots/bots.service';

@WebSocketGateway({ namespace: '/chat' })
export class MessageGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private userService: UsersService, private botsService:BotsService) {}
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('MessageGateway');

  @SubscribeMessage('sendMessage')
  public handleMessage(client: Socket, payload: any): void {
    const user = this.userService.findOne(client.id)
    const command = payload.text.split(" ");
    if (command[0] === "/giphy"){
      const keywords = command.slice(1, command.length).join(" ");
      this.botsService.findAll(keywords).then(response =>{
        client.emit('previousResults', response.data);
      }
      ).catch(err => this.logger.log(`error : ${err}`))
    }else{
      this.server.to(payload.room).emit('message', {user: payload.name, text: payload.text});
    }
  }

  @SubscribeMessage('sendMedia')
  public handleMedia(client: Socket, payload: any): void {
    this.server.to(payload.room).emit('message', {user: payload.name, text: payload.media});
  }

  @SubscribeMessage('joinRoom')
  public joinRoom(client: Socket, payload: any): void {
    const {error, user} = this.userService.create({id: client.id, name: payload.name, room: payload.room})
    
    if(error) throw new WsException(error);

    client.join(user.room);
    client.emit('message', {user:'admin', text:`${payload.name}, welcome to room ${payload.room}.`});
    client.broadcast.to(user.room).emit('message',{ user: 'admin', text: `${payload.name} has joined!!`});
    this.server.to(user.room).emit('roomData',{room: user.room, users: this.userService.findAll(user.room)})
  }

  public afterInit(server: Server): void {
    return this.logger.log('Init');
  }

  public handleDisconnect(client: Socket): void {
    const user = this.userService.remove(client.id)
    if(user){
      client.leave(user.room);
      client.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name} has left.`});
      this.server.to(user.room).emit('roomData',{room: user.room, users: this.userService.findAll(user.room)})
      return this.logger.log(`Client disconnected: ${client.id}`);
    }
  }

  public handleConnection(client: Socket): void {
    return this.logger.log(`Client connected: ${client.id}`);
  }
}
