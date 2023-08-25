import { Injectable } from '@nestjs/common';
import { Friend } from '../entities/friend.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/services/users.service';
import { FRIEND_STATUS } from '../utils/friends.util';
import { GraphQLError } from 'graphql';



@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    private readonly userService: UsersService,
  ) {}


  async listRequests(id: number): Promise<Friend[]> {
    return await this.friendRepository.find({
      where: [
        { sender: { id: id }, status: FRIEND_STATUS.PENDING },
        { recipient: { id: id }, status: FRIEND_STATUS.PENDING }
      ],
      relations: ['sender', 'recipient']
    });
  }

  async listFriends(id: number): Promise<Friend[]> {
    return await this.friendRepository.find({
      where: [
        { sender: { id: id }, status: FRIEND_STATUS.ACCEPTED },
        { recipient: { id: id }, status: FRIEND_STATUS.ACCEPTED }
      ],
      relations: ['sender', 'recipient']
    });
  }
 
  async sendFriendRequest(userId: number, friendId: number): Promise<Friend> {
    try {
      const friend = new Friend();

      const user = await this.userService.findOneById(userId);
      const future_friend = await this.userService.findOneById(friendId);

      friend.sender = user;
      friend.recipient = future_friend;

      await this.friendRepository.save(friend);

      return friend;
      } catch (error) {
      throw new GraphQLError('An error occurred while storing friend.');
    }
  }

  async findBySenderOrRecipient(userId: number, friendId: number): Promise<Friend> {
    return await this.friendRepository.findOne({
      where: [
        { sender: { id: userId }, recipient: { id: friendId } },
        { sender: { id: friendId }, recipient: { id: userId } }
      ],
    });
  }

  async acceptFriendRequest(id: number): Promise<Friend> {
    try {
      const friend_request = await this.friendRepository.findOne({
        where: { id: id }
      });
  
      if (!friend_request) {
        throw new Error("Friend request not found.");
      }
  
      friend_request.status = FRIEND_STATUS.ACCEPTED;
      friend_request.accepted_date = new Date();
  
      await this.friendRepository.save(friend_request);
  
      return friend_request;
    } catch (error) {
      throw new GraphQLError("An error occurred while accepting the friend request." + error.message);
    }
  }
  
  async rejectFriendRequest(id: number): Promise<Friend> {
    try {
      const friend_request = await this.friendRepository.findOne({
        where: { id: id }
      });
  
      if (!friend_request) {
        throw new Error("Friend request not found.");
      }
  
      friend_request.status = FRIEND_STATUS.REJECTED;
      friend_request.accepted_date = new Date();
  
      await this.friendRepository.save(friend_request);
  
      return friend_request;
    } catch (error) {
      throw new GraphQLError("An error occurred while rejecting the friend request: " + error.message);
    }
  }

  async findOne(id: number): Promise<Friend> {
    return await this.friendRepository.findOne({
      where: { recipient: { id: id } }
    });
  }
  


}
