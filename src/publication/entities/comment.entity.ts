import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Publication } from './publication.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar',nullable: true })
  @Field(() => String)
  comment: string;

  @Column()
  @Field(() => Int)
  idPublication: number;

  @ManyToOne(() => Publication, (publication) => publication.comments,{ onDelete:"CASCADE" })
  @JoinColumn({ name: 'idPublication'})
  @Field(() => Publication)
  publication: Publication;

  @ManyToOne(() => User, (user) => user.comments, {nullable: true})
  @JoinColumn({name: 'idUser'})
  @Field(() => User)
  user: User;

  @Column()
  @Field(() => Int)
  idComment: number;

  @ManyToOne(() => Comment, (comment) => comment.replys,{ nullable:true , onDelete:"CASCADE"})
  @JoinColumn({name: 'idComment'})
  @Field(() => Comment)
  content?: Comment;

  @OneToMany(() => Comment, (comment) => comment.comment)
  @Field(() => [Comment])
  replys?: Comment[];

}
