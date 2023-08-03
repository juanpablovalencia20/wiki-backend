import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Comment } from '../../publication/entities/comment.entity';
import { Publication } from '../../publication/entities/publication.entity';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany, UpdateDateColumn, CreateDateColumn } from 'typeorm';

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
