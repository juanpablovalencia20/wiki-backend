import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity, JoinColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Publication } from './publication.entity';
import { Exclude } from 'class-transformer';

@Entity()
@ObjectType()
export class Multimedia {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'text' , nullable: true})
  @Field(() => String)
  url: string;

  @Column({ type: 'text' , nullable: true})
  @Field(() => String)
  mimeType: string;

  @ManyToOne(() => Publication, (publication) => publication.multimedia,{ onDelete:"CASCADE" })
  @Field(() => Publication)
  @JoinColumn({ name: 'publication_id'})
  @Field(() => Publication)
  publication: Publication;
 
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
