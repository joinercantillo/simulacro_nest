import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { CustomerStatus } from "./statusCustomer.js";
import { ApiProperty } from "@nestjs/swagger";
import { Country } from "../../countries/entities/country.entity.js";

@Entity('customers')
export class Customer {

    id: string


    @ApiProperty({ example: 'juancho', minLength: 10})
    @Index({ unique: true })
    @Column({length:100})
    name:string

    @ApiProperty({ example: 'juancho', minLength: 10})
    @Index({ unique: true })
    @Column({length:100})
    
    lastname:string


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
    status:CustomerStatus

    @ApiProperty({description: 'customer city'})
    @ManyToOne(() => Country, {eager: true, onDelete: 'RESTRICT'})
    @JoinColumn({name:'idCountry'})
    country: Country

    @Column()
    countryId: string;

}
