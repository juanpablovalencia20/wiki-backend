import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from '../../publication/entities/comment.entity';
import { Publication } from '../../publication/entities/publication.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class User {
 
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({type: 'text', unique: true})
  @Field()
  email: string;

  @Column({ type: 'varchar', nullable: false })
  @Field()
  password: string;

  @Column({ type: 'varchar', nullable: true })
  @Field()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  @Field()
  profile_img: string;

  @Column({ type: 'varchar', nullable: true })
  @Field()
  cover_img: string;

  @Column({ type: 'varchar',nullable: true })
  @Field()
  biography: string;

  @OneToMany(() => Comment, (comment) => comment.user)
  @Field(() => [Comment])
  comments: Comment[];

  @OneToMany(() => Publication, (publication) => publication.user)
  @Field(() => [Publication])
  publications: Publication[];
}
