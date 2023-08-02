import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publication } from '../entities/publication.entity';
import { UsersService } from 'src/users/services/users.service';
import { GraphQLError } from 'graphql';

@Injectable()
export class PublicationService {
  private readonly publicationRelations = [
    'comments',
    'user',
    'categories',
    'multimedia',
  ];

  constructor(
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
    private readonly profileService: UsersService,
  ) {}

  async find(filters: any) {
    return await this.publicationRepository.find({
      relations: this.publicationRelations,
      where: filters,
    });
  }

  async findOneById(publicationId: number): Promise<Publication> {
    try {
      const foundPublication = await this.publicationRepository.findOne({
        where: { id: publicationId },
        relations: this.publicationRelations,
      });

      if (!foundPublication) {
        throw new Error('Publication not found');
      }

      return foundPublication;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }


  async findAll(): Promise<Publication[]> {
    try {
      const publicationsFound = await this.publicationRepository.find({
        relations: this.publicationRelations,
      });
      
      if (publicationsFound.length === 0) {
        return [];
      }

      return publicationsFound;
      } catch (error) {
      throw new GraphQLError(error.message);
    }
  }
}
