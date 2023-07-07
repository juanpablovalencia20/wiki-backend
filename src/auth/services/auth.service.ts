import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserInput } from '../dto/register-user.input';
import * as bcryptjs from 'bcryptjs';
import { GraphQLError } from 'graphql';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
      registered: user.name ? true : false,
      user: user
    };
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }
    const isMatch = await bcryptjs.compare(pass, user.password);
    if (!isMatch) {
      return null;
    }
    return user;
  }

  async register(registerUserInput: RegisterUserInput) {
    try {
      const newUser = await this.userService.register(registerUserInput);
      return this.login(newUser);
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }
}
