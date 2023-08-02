import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToMany } from 'typeorm';
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

  @Column({ type: 'varchar',nullable: true })
  @Field()
  description: string;


  @ManyToMany(() => Publication, (publication) => publication.categories)
  publications: Publication[];
}
