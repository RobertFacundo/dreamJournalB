import { IsBoolean, IsInt, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateDreamDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsString()
    content: string;

    @IsBoolean()
    nightmare: boolean;

    @IsInt()
    lucidity: number;

    @IsOptional()
    @IsString()
    mood?: string;

    @IsDateString()
    date: string;
}
