import { Module } from '@nestjs/common';
import { ChatResolver } from './resolvers/chat.resolver';
import { ChatService } from './services/chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Message } from './entities/messages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, Message])],
  providers: [ChatResolver, ChatService],
})
export class ChatModule {}
