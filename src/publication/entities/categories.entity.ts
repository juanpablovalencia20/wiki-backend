import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { Publication } from './publication.entity';

@Entity()
@ObjectType()
export class Categories {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar',nullable: true })
  @Field()
  name: string;

  @OneToMany(() => Publication, (publication) => publication.categories)
  @Field(() => [Publication])
  publications: Publication[];
}
