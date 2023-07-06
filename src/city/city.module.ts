import { Module } from '@nestjs/common';
import { CityService } from './services/city.service';
import { CityResolver } from '../city/resolvers/city.resolver';
import { City } from './entities/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  providers: [CityResolver, CityService],
})
export class CityModule {}
