import { Injectable } from '@nestjs/common';
import { Friend } from '../entities/friend.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/services/users.service';



@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    private readonly userService: UsersService,
  ) {}


 
}
