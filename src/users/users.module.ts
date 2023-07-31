import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersResolver } from './resolvers/users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from 'src/users/entities/user.entity'
@Module({
  imports: [TypeOrmModule.forFeature( [User])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
