import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../entities/messages.entity';
import { Repository } from 'typeorm';
import { Chat } from '../entities/chat.entity';
import { UsersService } from 'src/users/services/users.service';
import { GraphQLError } from 'graphql';



@Injectable()
export class ChatService {  
  private readonly chatRelations = [
    'user1',
    'user2'
  ];
    constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
    private readonly userService: UsersService,
 
  ) {}

  async findChatOrCreate(userId: number, friendId: number): Promise<Chat> {
    try {
      const chat = await this.chatRepository.findOne({
        where: [
          { user1: { id: userId }, user2: { id: friendId } },
          { user1: { id: friendId }, user2: { id: userId } }
        ]
      });
  
      if (!chat) {
        const newChat = new Chat();
        const user = await this.userService.findOneById(userId);
        const friend = await this.userService.findOneById(friendId);
  
        newChat.user1 = user;
        newChat.user2 = friend;
  
        await this.chatRepository.save(newChat);
  
        return newChat;
      }
  
      return chat;
      } catch (error) {
      throw new GraphQLError("An error occurred while creating the chat.");
    }
  }



  async storeMessage(content: string, chatId: number, userId: number): Promise<Message> {
    try {
      const chat = await this.chatRepository.findOne({
       where: {id: chatId}, 
       relations: ['user1', 'user2']
      });
      const user = await this.userService.findOneById(userId);
  
      const message = new Message();
      message.content = content;
      message.chat = chat;
      message.sender = user;
  
      await this.messageRepository.save(message);
  
      return message;
      } catch (error) {
      throw new GraphQLError("An error occurred while storing the message: " + error.message);
    }
  }
  

  async findChats(userId: number): Promise<Chat[]> {
    const chats = await this.chatRepository.find({
      where: [
        { user1:{ id: userId } },
        { user2: { id: userId } }
      ],
      relations: this.chatRelations
    });

    return chats;
  }

  async findMessages(chatId: number): Promise<Message[]> {
    const messages = await this.messageRepository.find({
      where: { chat:{ id: chatId } },
      order: { createdAt: 'ASC' },
      relations: ['sender']
    });

    return messages;
  }

}
