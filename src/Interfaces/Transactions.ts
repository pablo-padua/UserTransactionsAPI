import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users";

@Entity()
export class Transactions extends BaseEntity {


    @PrimaryGeneratedColumn()
    id !: number;

    @Column({type: "numeric", nullable: false})
    income !: number;

    @Column({type: "numeric", nullable: false})
    outflow !: number;

    @Column({type: "varchar", nullable: false})
    description !: number;

    @Column({type: "timestamp", nullable: false})
    date !: Date;

    @ManyToOne(() => Users, user => user.transactions, { onDelete: "CASCADE"})
    user!: Users['id'];

    
}