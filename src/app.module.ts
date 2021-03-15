import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from './message-events/message.module';
import { UsersModule } from './users/users.module';
import { BotsModule } from './bots/bots.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MessageModule,
    UsersModule,
    BotsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
