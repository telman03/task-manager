import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
class Task {
    
    @PrimaryGeneratedColumn()
    @ApiProperty({ type: () => Number})
    public id: number;

    @ApiProperty({ type: () => String})
    @Column()
    public title: string;
}

export default Task;