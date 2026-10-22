import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";


@Entity('countries')
export class Country {
    
    @ApiProperty({ description: 'unique uuid for each country'})
    @PrimaryColumn('uuid')
    idCountry: string;


    @ApiProperty({description: 'City name', maxLength: 100})
    @Column({type: 'varchar', length: 100})
    name: string;

    @ApiProperty({ description: 'Creation timestamp' })
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date


    @ApiProperty({ description: 'Creation timestamp' })
    @CreateDateColumn({ type: 'timestamptz' })
    updatedAt: Date
}
