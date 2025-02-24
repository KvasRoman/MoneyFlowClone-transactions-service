import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Index('IDX_ID_ACCOUNT_DATE', ['id','accountId', 'transactionDate'])
@Entity('trasactions')
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Index()
    @Column()
    accountId: string;

    @Column()
    amount: number;

    @Column()
    currency: string;

    @Column({ nullable: true })
    description?: string;

    @Column()
    transactionDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}