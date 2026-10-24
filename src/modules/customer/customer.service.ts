import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity.js';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CustomerStatus } from './entities/statusCustomer.js';
import * as bcrypt from 'bcrypt';


@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ){}

async create(dto: CreateCustomerDto) {
    const CustomerName = dto.CustomerName.trim();
    const Customerlastname = dto.Customerlastname.trim();
    const email = dto.email.trim();
    const cityName = dto.countryNAME.trim();
    const status = dto.status
    // Verificamos si ya existe con el email limpio
    const existingCostumer = await this.customerRepository.findOneBy({ email });
    
    if (existingCostumer) {
      throw new ConflictException(
       `Customer with email "${email}" already exists` 
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 10);

    const customer = this.customerRepository.create({
      ...dto,
      CustomerName,
      Customerlastname,
      email,
      countryNAME: cityName,
      status :status as CustomerStatus,
      password:hashPassword
    });

    try {
      return await this.customerRepository.save(customer);
    } catch (error) {
      throw error; 
    }
  }

  async findAll(): Promise<Customer[]> {
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
