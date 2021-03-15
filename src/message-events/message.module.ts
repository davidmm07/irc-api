import { Module } from '@nestjs/common';
import { BotsModule } from 'src/bots/bots.module';
import { UsersModule } from 'src/users/users.module';
import { MessageGateway } from './message.gateway';

@Module({
  imports: [UsersModule, BotsModule],
  controllers: [],
  providers: [MessageGateway],
})
export class MessageModule {}
