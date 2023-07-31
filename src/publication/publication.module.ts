import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationResolver } from './resolvers/publication.resolver';
import { PublicationService } from './services/publicacion.service';
import { Categories } from './entities/categories.entity';
import { Publication } from './entities/publication.entity';
import { Comment } from './entities/comment.entity';
import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    Publication, 
    Categories,
    Comment,
  ]),
 UsersModule
],  
  providers: [PublicationResolver, PublicationService]
})
export class PublicationModule {}
