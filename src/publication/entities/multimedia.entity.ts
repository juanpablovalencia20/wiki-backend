import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Publication } from './publication.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
@ObjectType()
export class Multimedia {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String)
  url: string;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String)
  mimeType: string;

  @Field(() => Publication)
  @ManyToOne(() => Publication, (publication) => publication.multimedia,{ onDelete:"CASCADE" })
  @JoinColumn({ name: 'idPublication'})
  @Field(() => Publication)
  publication: Publication;
 


}
