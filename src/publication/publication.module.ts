import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationResolver } from './resolvers/publication.resolver';
import { PublicationService } from './services/publicacion.service';
import { Categories } from './entities/categories.entity';
import { Publication } from './entities/publication.entity';
import { Comment } from './entities/comment.entity';
import { UsersModule } from 'src/users/users.module';
import { Multimedia } from './entities/multimedia.entity';
import { FilesPublicationController } from './controllers/files-publication.controller';
import { MultimediaService } from './services/mutimedia.service';



@Module({
  imports: [TypeOrmModule.forFeature([
    Publication, 
    Categories,
    Comment,
    Multimedia
  ]),
 UsersModule,
],  
  providers: [PublicationResolver, PublicationService, MultimediaService],
  controllers: [FilesPublicationController],
})
export class PublicationModule {}
