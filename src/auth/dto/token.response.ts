import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenResponse {
 
  @Field(() => String)
  access_token: string;

  @Field(() => Boolean)
  emailVerified: boolean;

  @Field(() => Boolean)
  registered: boolean;

 
}
