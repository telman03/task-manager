import { IsString } from "class-validator";

export class UpdateTaskDto {
    @IsString()
    title: string;
}