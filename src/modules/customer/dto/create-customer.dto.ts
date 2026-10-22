import { ApiProperty } from "@nestjs/swagger"
import { IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator"
import { CustomerStatus } from "../entities/statusCustomer.js"


export class CreateCustomerDto {

    @ApiProperty({
        description: 'customer name',
        type:String,
        example: 'Juancho'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name:string

    @ApiProperty({
        description: 'customer lastname',
        type:String,
        example: 'ROY'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    lastname:string

    @ApiProperty({
        description: 'customer name',
        type:String,
        example: 'Juancho'
    })
    @IsEnum(CustomerStatus)
    @IsNotEmpty()
    @MaxLength(100)
    status:string

    
    country:string

}
