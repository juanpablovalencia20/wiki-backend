import { InputType, Field } from '@nestjs/graphql';
import {IsNotEmpty, IsString} from 'class-validator';
@InputType()
export class CreateMessageInput {
  
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  description : string;


}
