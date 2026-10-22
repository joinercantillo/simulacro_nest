import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MaxLength } from "class-validator";



export class CreateCountryDto {

    @ApiPropertyOptional({
        description: 'Name of the country',
        type: String,
        example: 'Cartagena'
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    


}
