import { IsEmail, IsString, IsStrongPassword } from "class-validator";



export class CreateAuthDto {

    @IsEmail()
    @IsString()
    email: string;


    @IsStrongPassword()
    @IsString()
    password: string;
}
