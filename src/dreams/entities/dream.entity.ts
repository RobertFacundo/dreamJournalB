import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Entity()
export class Dream {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    content: string;

    @Column({ default: false })
    nightmare: boolean;

    @Column({ type: 'int', default: 5 })
    lucidity: number;

    @Column({ nullable: true })
    mood: string;

    @Column({ type: 'date' })
    date: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, user => user.dreams, { onDelete: 'CASCADE' })
    user: User;
}
