import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, ManyToMany, JoinTable, UpdateDateColumn } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../../users/entities/user.entity';
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
  @JoinColumn({name: 'user_id'})
  @Field(() => User)
  user: User;

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
