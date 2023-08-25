import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FriendsService } from '../services/friends.service';
import { Friend } from '../entities/friend.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GraphQLError } from 'graphql';

@Resolver()
export class FriendsResolver {
  constructor(private readonly friendsService: FriendsService) {}


  @Query(() => [Friend])
  @UseGuards(JwtAuthGuard)
  async listFriendsRequests(@Context() context): Promise<Friend[]> {
    try {
      const friendsRequests = await 
      this.friendsService.listRequests(context.req.user.sub);
      return friendsRequests;
      } catch (error) {
      throw new GraphQLError('An error occurred while retrieving friend requests.' + error.message);
    }
  }

  @Query(() => [Friend])
  @UseGuards(JwtAuthGuard)
  async listFriends(@Context() context): Promise<Friend[]> {
    try {
      const friends = await 
      this.friendsService.listFriends(context.req.user.sub);
       return friends;
     } catch (error) {
      throw new GraphQLError('An error occurred while retrieving friend list.' + error.message);
    }
  }

  @Mutation(() => Friend)
  @UseGuards(JwtAuthGuard)
  async sendFriendRequest( @Args('id') friendId: number, @Context() context): Promise<Friend> {
    try {
      const requestExists = await this.friendsService.findBySenderOrRecipient(context.req.user.sub, friendId);

      if (requestExists) {
        throw new GraphQLError('Friend request already created.');
      }

      const friend_request = await this.friendsService.sendFriendRequest(context.req.user.sub, friendId);

      return friend_request;
    } catch (error) {
      throw new GraphQLError('An error occurred while processing your request.' + error.message);
    }
  }
  
  @Mutation(() => Friend)
  @UseGuards(JwtAuthGuard)
  async acceptFriendRequest(@Args('id') friendId: number, @Context() context): Promise<Friend> {
    try {
      const request = await this.friendsService.findOne(context.req.user.sub);
  
      if (!request) {
        throw new GraphQLError('No pending friend request found for acceptance.');
      }
  
      const friend_request = await this.friendsService.acceptFriendRequest(request.id);
  
      return friend_request;
    } catch (error) {
      throw new GraphQLError('An error occurred while accepting the friend request: ' + error.message);
    }
  }
  
  @Mutation(() => Friend)
  @UseGuards(JwtAuthGuard)
  async rejectFriendRequest(@Args('id') friendId: number, @Context() context): Promise<Friend> {
    try {
      const request = await this.friendsService.findOne(context.req.user.sub);
  
      if (!request) {
        throw new GraphQLError('No pending friend request found for rejection.');
      }
      
      const friend_request = await this.friendsService.rejectFriendRequest(request.id);
  
      return friend_request;
      } catch (error) {
      throw new GraphQLError('An error occurred while rejecting the friend request.' + error.message);
    }
  }

}
