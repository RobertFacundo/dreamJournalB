import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Dream } from "src/dreams/entities/dream.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ default: false })
    hasSeenWelcomeModal: boolean;

    @OneToMany(() => Dream, dream => dream.user)
    dreams: Dream[];
}
