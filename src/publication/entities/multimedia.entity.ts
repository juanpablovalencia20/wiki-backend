import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity, JoinColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Publication } from './publication.entity';
import { User } from '../../users/entities/user.entity';

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
  @JoinColumn({ name: 'idPublication'})
  @Field(() => Publication)
  publication: Publication;
 

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
