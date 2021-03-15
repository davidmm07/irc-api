import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  create(userEntity: User) {
    const id = userEntity.id;
    const name = userEntity.name.trim().toLowerCase();
    const room = userEntity.room.trim().toLowerCase();
    if (!name || !room) return { error: 'Nickname and room are required.' };

    const userExists = this.users.find((user) => user.name === name && user.room === room)
    if (userExists) return {error: 'User already exists.'};

    const user = { id, name, room };
    this.users.push(user);
    return { user };
  }

  findAll(room: string) {
    return this.users.filter((user) => user.room === room);
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  remove(id: string) {
    const index = this.users.findIndex((user) =>user.id === id)
    if (index !== -1) return this.users.splice(index, 1)[0];
  }
}
