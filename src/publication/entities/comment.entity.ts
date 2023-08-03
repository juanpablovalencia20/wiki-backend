import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity, JoinColumn, ManyToOne, OneToMany, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Publication } from './publication.entity';
import { User } from '../../users/entities/user.entity';

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

  @ManyToOne(() => Comment, (comment) => comment.response,{ nullable:true , onDelete:"CASCADE"})
  @JoinColumn({name: 'idComment'})
  @Field(() => Comment)
  content?: Comment;

  @OneToMany(() => Comment, (comment) => comment.comment, { nullable: true })
  @Field(() => [Comment])
  response?: Comment[];

  
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field(() => Date)
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

}
