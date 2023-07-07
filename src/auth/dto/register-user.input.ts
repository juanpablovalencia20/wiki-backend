import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class RegisterUserInput {
  
  @IsOptional()
  @Field(() => String, { nullable: true })
  username?: string;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  @Field(() => String)
  password: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  cover_img?: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  profile_img?: string;
}
