import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, ManyToMany, JoinTable, UpdateDateColumn } from 'typeorm';
import { Comment } from './comment.entity';
import { User } from '../../users/entities/user.entity';
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
