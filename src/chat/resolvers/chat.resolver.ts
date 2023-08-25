import { Args, Context, Mutation, Resolver, Query, Subscription, Root } from '@nestjs/graphql';
import { ChatService } from '../services/chat.service';
import { Chat } from '../entities/chat.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GraphQLError } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
import { Message } from '../entities/messages.entity';

@Resolver()
export class ChatResolver {
    private pubSub = new PubSub();
    constructor(private readonly chatService: ChatService) {}

   
    @Mutation(() => Chat)
    @UseGuards(JwtAuthGuard)
    async createChat(@Args('friendId') friendId: number, @Context() context): Promise<Chat> {
      try {
        const chat = await this.chatService.findChatOrCreate(context.req.user.sub, friendId);
        return chat;
      } catch (error) {
        throw new GraphQLError("An error occurred while creating the chat." + error.message);
      }
    }
    @Mutation(() => Message)
    @UseGuards(JwtAuthGuard)
    async sendMessage(
      @Args('chatId') chatId: number,
      @Args('content') content: string,
      @Context() context
    ): Promise<Message> {
      const userId = context.req.user.sub;
      try {
        const message = await this.chatService.storeMessage(content, chatId, userId);
  
        this.pubSub.publish('watchMessages', { watchMessages: message });
  
        return message;
      } catch (error) {
        throw new GraphQLError("An error occurred while sending the message: " + error.message);
      }
    }
  
    @Subscription(() => Message)
    async watchMessages(): Promise<AsyncIterator<Message>> {
      return this.pubSub.asyncIterator('watchMessages');
    }
  
     
      @Query(() => [Message])
      @UseGuards(JwtAuthGuard)
      async listMessages(@Args('chatId') chatId: number): Promise<Message[]> {
        try {
          const messages = await this.chatService.findMessages(chatId);
          return messages;
        } catch (error) {
          throw new GraphQLError("An error occurred while listing messages: " + error.message);
        }
      }
      
      @Query(() => [Message])
      @UseGuards(JwtAuthGuard)
      async listChats(@Context() context): Promise<Chat[]> {
        try {
          const chats = await this.chatService.findChats(context.req.user.sub);
          return chats;
        } catch (error) {
          throw new GraphQLError("An error occurred while listing chats :" + error.message);
        }
      }



}
