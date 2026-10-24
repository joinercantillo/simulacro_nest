import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CustomerStatus } from "./statusCustomer.js";
import { ApiProperty } from "@nestjs/swagger";
import { Country } from "../../countries/entities/country.entity.js";
import { IsEmail, IsOptional, IsStrongPassword } from "class-validator";

@Entity('customers') // Nombre de tu tabla en la base de datos
export class Customer {
  
  @ApiProperty({ description: 'Unique uuid for each customer' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Customer name' })
  @Column({ type: 'varchar', length: 100 })
  CustomerName: string;

  @ApiProperty({ description: 'Customer name' })
  @Column({ type: 'varchar', length: 100 })
  Customerlastname: string


  @ApiProperty({ description: 'Customer email' })
  @Column({ unique: true })
  @IsEmail()
  email: string;


  @ApiProperty({ description: 'customer password'})
  @Column()
  @IsStrongPassword()
  password: string

  
  @ApiProperty({
    enum: CustomerStatus,
    example: CustomerStatus.ACTIVE,
    default: CustomerStatus.ACTIVE,
  })
  @Column({
    type: 'enum',
    enum: CustomerStatus,
    default: CustomerStatus.ACTIVE,
  })
  @IsOptional()
  status?: CustomerStatus;

  @ApiProperty({ description: 'Customer country' })
  @ManyToOne(() => Country, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'idCountry' }) // Debe coincidir con la PK de la entidad Country
  country: Country;

  @ApiProperty({ description: 'Country ID foreign key' })
  @Column({ name: 'idCountry' }) // Nombre exacto de la columna física en la BD que almacena la FK
  idCountry: string;

  @JoinColumn({ name: 'countryNAME'})
  @ManyToOne(() => Country, {eager:true, onDelete: 'RESTRICT'})
  @ApiProperty({ description: 'Country name' })
  @Column({ name: 'name' }) // Nombre exacto de la columna física en la BD que almacena la FK
  countryNAME: string;

  @ApiProperty({ description: 'Creation timestamp' })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ApiProperty({ description: 'Update timestamp' })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

}
