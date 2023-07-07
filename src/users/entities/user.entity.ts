import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class User {
 
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', nullable: true })
  @Field()
  username: string;

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
}
