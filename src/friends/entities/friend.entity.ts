import { User } from 'src/users/entities/user.entity';
import { FRIEND_STATUS } from '../utils/friends.util';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  Column,
} from 'typeorm';

@Entity()
@ObjectType()
export class Friend {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @ManyToOne(() => User, (user) => user.sender, {nullable: true})
  @JoinColumn({name: 'sender_id'})
  @Field(() => User)
  sender: User;

  @OneToOne(() => User, (user) => user.friend)
  @JoinColumn({ name: 'recipient_id'})
  @Field(() => User, { nullable: false })
  recipient: User;

  @Column({ nullable: true })
  @Field(() => Date)
  accepted_date: Date;

  @Column({ type: 'enum', enum: FRIEND_STATUS, default: FRIEND_STATUS.PENDING })
  @Field(() => String)
  status: FRIEND_STATUS;

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
