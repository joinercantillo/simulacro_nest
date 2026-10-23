import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator"
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
        description: 'Customer email',
        type: String,
        example: 'a@a.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({
        description: 'customer name',
        type:String,
        example: 'Juancho'
    })
    @IsEnum(CustomerStatus)
    @IsNotEmpty()
    @MaxLength(100)
    status:string
@ApiProperty({
        description: 'Country UUID reference',
        type: String,
        example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
    })
    @IsUUID()
    @IsNotEmpty()
    idCountry: string; // Cambiado de 'country' a 'idCountry' para hacer match con la entidad

}
