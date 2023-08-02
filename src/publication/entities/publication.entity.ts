import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../../users/entities/user.entity';
import { Categories } from './categories.entity';
import { Multimedia } from './multimedia.entity';
import { Exclude } from 'class-transformer';

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

  @ManyToMany(() => Categories, (categories) => categories.publications)
  @Field(() => [Categories], { nullable: true })
  @JoinTable({
    name: 'categories_publication',
    joinColumn: { name: 'publicationId' },
    inverseJoinColumn: { name: 'categoriesId' },
  })
  categories: Categories[];



  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;


}
