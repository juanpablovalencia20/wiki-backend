import { User } from 'src/users/entities/user.entity';
import { Chat } from './chat.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';


@Entity()
@ObjectType()
export class Message {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String)
  content: string;

  @Column({default: false, name: 'see'})
  @Field(() => Boolean)
  see: boolean;

  @ManyToOne(() => User, (user) => user.sentMessages, {nullable: true})
  @JoinColumn({ name: 'sender_id' })
  @Field(() => User)
  sender: User;

  @ManyToOne(() => Chat, (chat) => chat.message, {nullable: true})
  @JoinColumn({name: 'chat_id'})
  @Field(() => Chat)
  chat: Chat;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Field(() => Date)
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
