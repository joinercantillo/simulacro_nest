import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword, IsUUID, MaxLength } from "class-validator"
import { CustomerStatus } from "../entities/statusCustomer.js"
import { Column } from "typeorm"


export class CreateCustomerDto {

    @ApiProperty({
        description: 'customer name',
        type:String,
        example: 'Juancho'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    CustomerName:string

    @ApiProperty({
        description: 'customer lastname',
        type:String,
        example: 'ROY'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    Customerlastname:string

    @ApiProperty({
        description: 'Customer email',
        type: String,
        example: 'a@a.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsStrongPassword()
    @IsString()
    @IsNotEmpty()
    password: string

    @Column({
    type: 'varchar',
    length: 20,
    default: CustomerStatus.ACTIVE,
    })
    @IsOptional()
    status?:CustomerStatus
    
    @Column({})
    countryNAME:string

}
