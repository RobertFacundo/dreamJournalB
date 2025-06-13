import { PartialType } from '@nestjs/mapped-types';
import { IsString, MinLength } from 'class-validator';
import { RegisterDto } from './register.dto';

export class LoginDto extends PartialType(RegisterDto) {
    @IsString()
    username: string;

    @IsString()
    @MinLength(6)
    password: string;
}
