import { User } from 'src/users/entities/user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';


@Entity()
@ObjectType()
export class Chat {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => User, (user) => user.chatsAsUser1, {nullable: true})
  @JoinColumn({name: 'user1_id'})
  @Field(() => User)
  user1: User;

  @ManyToOne(() => User, (user) => user.chatsAsUser2, {nullable: true})
  @JoinColumn({name: 'user2_id'})
  @Field(() => User)
  user2: User;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;
  
}
