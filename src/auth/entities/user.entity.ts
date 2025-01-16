import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: string


    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({default: true})
    isActive: boolean
}
