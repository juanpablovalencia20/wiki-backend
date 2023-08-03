import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToMany, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Publication } from './publication.entity';

@Entity()
@ObjectType()
export class Categories {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'text',nullable: true })
  @Field()
  name: string;

  @Column({ type: 'text',nullable: true })
  @Field()
  description: string;

  @Column({ type: 'text' , nullable: true})
  @Field(() => String)
  image: string;

  @ManyToMany(() => Publication, (publication) => publication.categories)
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
