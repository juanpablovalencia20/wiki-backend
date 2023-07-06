import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CityService } from '../services/city.service';
import { City } from '../entities/city.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => City)
export class CityResolver {
  constructor(private readonly cityService: CityService) {}

  @Query(() => [City])
  cities() {
    return this.cityService.findAll();
  }
}
