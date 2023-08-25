import { Module } from '@nestjs/common';
import { FriendsService } from './services/friends.service';
import { FriendsResolver } from './resolvers/friends.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './entities/friend.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Friend]), UsersModule],

  providers: [FriendsService, FriendsResolver],
})
export class FriendsModule {}
