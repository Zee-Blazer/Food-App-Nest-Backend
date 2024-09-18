import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    isChef: boolean;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ unique: true })
    username: string;

    @Column({ nullable: true })
    bio: string;

    @Column({ unique: true, nullable: true })
    phone: string;
}
