import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PublicationService } from '../services/publicacion.service';
import { Publication } from '../entities/publication.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePublicationInput } from '../dto/create-publication.input';
import { GraphQLError } from 'graphql';


@Resolver(() => String)
export class PublicationResolver {
    constructor(private readonly publicationService: PublicationService) {}


    @Query(() => [Publication])
    publications() {
      return this.publicationService.findAll();
    }

    @Mutation(() => Publication)
    @UseGuards(JwtAuthGuard)
    async createPublication(
      @Args('publication') publication: CreatePublicationInput,
      @Context() context) {
      try {
        return this.publicationService.createPublication(publication,context.req.user.sub);
      } catch (error) {
        throw new GraphQLError("Failed to create publication: " + error.message);
      }
    }
    

}