import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PublicationService } from '../services/publicacion.service';
import { Publication } from '../entities/publication.entity';

@Resolver(() => String)
export class PublicationResolver {
    constructor(private readonly publicationService: PublicationService) {}


    @Query(() => [Publication])
    publications() {
      return this.publicationService.findAll();
    }

}