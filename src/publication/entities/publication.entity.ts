import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../../users/entities/user.entity';
import { Categories } from './categories.entity';
import { Multimedia } from './multimedia.entity';

@Entity()
@ObjectType()
export class Publication {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String)
  description: string;

  @OneToMany(() => Comment, (comment) => comment.publication, {nullable: true})
  @Field(() => [Comment])
  comments: Comment[];

  @OneToMany(() => Multimedia, (multimedia) => multimedia.publication, {nullable: true})
  @Field(() => [Multimedia])
  multimedia: Multimedia[];

  @ManyToOne(() => User, (user) => user.publications, {nullable: true})
  @JoinColumn({name: 'idUser'})
  @Field(() => User)
  user: User;

  @ManyToOne(() => Categories, (categories) => categories.publications, {nullable: true})
  @JoinColumn({name: 'idCategories'})
  @Field(() => Categories)
  categories: Categories;



}
