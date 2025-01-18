import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string

    @Column()
    password: string

    // @Column()
    // confirm_password: string

    @Column({default: 'user'})
    role: string

    @Column({ default: true})
    isActive: boolean
}