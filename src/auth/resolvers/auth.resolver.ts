import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { LoginUserInput } from '../dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { TokenResponse} from '../dto/token.response'
import { RegisterUserInput } from '../dto/register-user.input';
import { GraphQLError } from 'graphql';
import { GqlAuthGuard } from '../guards/gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => TokenResponse)
  @UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,@Context() context) {
    try {
      return this.authService.login(context.user);
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  @Mutation(() => TokenResponse)
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput) {
    try {
      return await this.authService.register(registerUserInput);
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }
}
