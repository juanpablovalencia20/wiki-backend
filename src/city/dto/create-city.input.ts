import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCityInput {
  @Field()
  code: string;

  @Field()
  description: string;
}
