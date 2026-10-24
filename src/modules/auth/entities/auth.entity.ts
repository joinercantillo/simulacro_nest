import { IsEmail, IsString, IsStrongPassword } from "class-validator"
import { JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { ApiProperty } from "@nestjs/swagger";


export class Auth {

    @ApiProperty({ description: 'Unique uuid for each customer' })
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @IsEmail()
    @IsString()
    email: string

    @IsString()
    password:string
    
}
