import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity, JoinColumn, ManyToOne, OneToMany, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Publication } from './publication.entity';
import { User } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'text',nullable: true })
  @Field(() => String)
  comment: string;

  @Column()
  @Field(() => Int)
  publication_id: number;

  @ManyToOne(() => Publication, (publication) => publication.comments,{ onDelete:"CASCADE" })
  @JoinColumn({ name: 'publication_id'})
  @Field(() => Publication)
  publication: Publication;

  @ManyToOne(() => User, (user) => user.comments, {nullable: true})
  @JoinColumn({name: 'user_id'})
  @Field(() => User)
  user: User;

  @Column()
  @Field(() => Int)
  comment_id: number;

  @ManyToOne(() => Comment, (comment) => comment.response,{ nullable:true , onDelete:"CASCADE"})
  @JoinColumn({name: 'comment_id'})
  @Field(() => Comment)
  content?: Comment;

  @OneToMany(() => Comment, (comment) => comment.comment, { nullable: true })
  @Field(() => [Comment])
  response?: Comment[];

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  @Field(() => Date)
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;

}
