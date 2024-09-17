import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isChef: boolean;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ unique: true })
    username: string;

    @Column()
    bio: string;

    @Column({ unique: true })
    phone: string;
}
