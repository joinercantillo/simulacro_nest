import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto.js';
import { UpdateCountryDto } from './dto/update-country.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity.js';
import { QueryFailedError, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countriesRepository: Repository<Country>
  ) {}


  async create(dto: CreateCountryDto) {
    const name = dto.name.trim();
    const existingCountry = await this.countriesRepository.findOneBy({ name })
    
    if (existingCountry) {
      throw new ConflictException(
      `Couentry with name "${name}" already exists`
      );
    }

    const country = this.countriesRepository.create({
      ...dto,
      idCountry: uuidv4(),
      name
    });

    try {
      return await this.countriesRepository.save(country)
    } catch (error) {
      if (
      error instanceof QueryFailedError &&
      error.driverError?.code === '23505'
      ) {
        throw new ConflictException(
          `Country with name "${name}" already exists`
        );
      }
      throw error;
    }
    
  }


  findAll(): Promise<Country[]> {
    return this.countriesRepository.find({ order: { name: 'ASC'}}); 
  }

  async findOne(name: string): Promise<Country> {
    const country = await this.countriesRepository.findOneBy({ name });
    if (!country) {
      throw new NotFoundException(`Country with name ${name} not found`)
    }
    return country
  }

  update(id: number, updateCountryDto: UpdateCountryDto) {
    return `This action updates a #${id} country`;
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}
