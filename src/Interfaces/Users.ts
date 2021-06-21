import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from "typeorm";
import { Transactions } from "./Transactions";
import { salt } from "../utils";
import bcrypt from 'bcrypt';

@Entity()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({nullable : false, type: 'text'})
    name!: string;

    @Column({nullable : false, type: 'text'})
    email!: string;

    @Column({nullable : false, type: 'varchar',})
    password!: string;

    @Column({nullable : false, unique: true, type: 'varchar',})
    login!: string;

    @Column({nullable: true, type: 'varchar'})
    description?: string | null;

    @Column({nullable : false, type: "timestamp"})
    birthDate!: Date;

    @OneToMany(() => Transactions, transactions => transactions.user)
    transactions!: Transactions[];

    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        this.password = await bcrypt.hash(this.password, salt);
    }
}