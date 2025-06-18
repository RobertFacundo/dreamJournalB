import { IsBoolean, IsOptional } from "class-validator";

export class UpdateUserDto{
    @IsOptional()
    @IsBoolean()
    hasSeenWelcomeModal?: boolean;  
}