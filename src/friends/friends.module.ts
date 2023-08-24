import { Module } from '@nestjs/common';
import { FriendsService } from './services/friends.service';
import { FriendsResolver } from './resolvers/friends.resolver';

@Module({
  providers: [FriendsService, FriendsResolver]
})
export class FriendsModule {}
