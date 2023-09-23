import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
class Task {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public title: string;
}

export default Task;