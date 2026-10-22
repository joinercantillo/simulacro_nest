import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CountriesService } from './countries.service.js';
import { CreateCountryDto } from './dto/create-country.dto.js';
import { UpdateCountryDto } from './dto/update-country.dto.js';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Country } from './entities/country.entity.js';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  @ApiOperation({ summary: 'create transport destiny' })
  @ApiResponse({
    status: 201,
    description: 'Country created successfully.',
    type: Country,
  })
  @ApiResponse({ status: 409, description: 'Country name already exists.' })
  
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.create(createCountryDto);
  }

  @Get()
  findAll() {
    return this.countriesService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.countriesService.findOne(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countriesService.update(+id, updateCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countriesService.remove(+id);
  }
}
