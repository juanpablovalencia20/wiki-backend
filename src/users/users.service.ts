import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RegisterUserInput } from 'src/auth/dto/register-user.input';
import { GraphQLError } from 'graphql';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email }
    });
  }

  async register(registerUserInput: RegisterUserInput) {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { email: registerUserInput.email }
      });
      if (existingUser) {
        throw new GraphQLError('Este email ya existe');
      }
      const newProfile = await this.userRepository.create(registerUserInput);
      newProfile.password = await bcryptjs.hash(registerUserInput.password, 10);
      return await this.userRepository.save(newProfile);
    } catch (error) {
      throw error;
    }
  }
}
