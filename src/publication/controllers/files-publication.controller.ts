import {
  Controller,
  Param,
  Post,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { MultimediaService } from '../services/mutimedia.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('publication')
export class FilesPublicationController {
  constructor(private readonly multimediaService: MultimediaService) {}


  @Post(':publicationId')
  @UseInterceptors(FilesInterceptor('files', 10, {
    storage: diskStorage({
      destination: './publication',
      filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.floor(Math.random() * 1000) + extname(file.originalname);
        cb(null, uniqueName);
      },
    }),
  }))
  async uploadFiles(@Param('publicationId') publicationId: number, @UploadedFiles() files: any) {
    return this.multimediaService.uploadMedia(publicationId, files);
  }
}
