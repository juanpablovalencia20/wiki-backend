import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Express } from 'express';
import { Multimedia } from '../entities/multimedia.entity';
import { PublicationService } from './publicacion.service';


@Injectable()
export class MultimediaService {
  constructor(
    @InjectRepository(Multimedia)
    private readonly multimediaRepository: Repository<Multimedia>,
    private readonly publicationService: PublicationService,

 
  ) {}


  
  async uploadMedia(publicationId: number, files: any): Promise<string> {
  if (!files) {
    throw new BadRequestException('No files were uploaded.');
  }

  const publication = await this.publicationService.findOneById(publicationId);

  if (!publication) {
    throw new BadRequestException('Publication not found.');
  }

  const mediaPromises = files.map((file: any) => {
    const media = this.multimediaRepository.create({
      url: `http://localhost:3002/${file.filename}`,
      mimeType: file.mimetype,
      publication,
    });
    return this.multimediaRepository.save(media);
  });

  await Promise.all(mediaPromises);

  return "Files uploaded successfully";
}

}
