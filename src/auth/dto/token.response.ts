import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class TokenResponse {
 
  @Field(() => String)
  access_token: string;

  @Field(() => Boolean)
  emailVerified: boolean;

  @Field(() => Boolean)
  registered: boolean;

  @Field(()=> User)
  user: string;
 
}
