import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity.js';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ){}

  async create(dto: CreateCustomerDto) {
    const name = dto.name.trim();
    const lastname = dto.lastname.trim();
    const cityID = dto.idCountry.trim();
    const existingCostumer = await this.customerRepository.findOneBy({ email: dto.email })
    
    if (existingCostumer) {
      throw new ConflictException(
       `Couentry with name "${dto.email}" already exists` 
      )
    }

    const customer = this.customerRepository.create({
      ...dto,
      id: uuidv4(),
      name,
      lastname,
      
    })

    return 'This action adds a new customer';
  }

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find({ order: { id: 'ASC'}}); 
  }

async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(`Country with name ${id} not found`)
    }
    return customer
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
