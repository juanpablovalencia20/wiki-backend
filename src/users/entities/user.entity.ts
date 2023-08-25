import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from '../../publication/entities/comment.entity';
import { Publication } from '../../publication/entities/publication.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany, UpdateDateColumn, CreateDateColumn, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Chat } from 'src/chat/entities/chat.entity';
import { Friend } from 'src/friends/entities/friend.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({type: 'text', unique: true})
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar', nullable: false })
  @Field(() => String)
  password: string;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String)
  profile_img: string;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String)
  cover_img: string;

  @Column({ type: 'varchar',nullable: true })
  @Field(() => String)
  biography: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  @Field(() => [Comment])
  comments: Comment[];

  @OneToMany(() => Friend, (friend) => friend.sender)
  @Field(() => [Friend])
  sender: Friend[];

  @OneToMany(() => Chat, (chat) => chat.user1)
  @Field(() => [Chat])
  chatsAsUser1: Chat[];

  @OneToMany(() => Chat, (chat) => chat.user2)
  @Field(() => [Chat])
  chatsAsUser2: Chat[];

  @OneToMany(() => Publication, (publication) => publication.user)
  @Field(() => [Publication])
  publications: Publication[];

  @Column({ type: 'varchar',nullable: true })
  @Field(() => String)
  status: string;

  @OneToOne(() => Friend, (friend) => friend.recipient)
  @Field(() => Friend)
  friend: Friend;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;
}
