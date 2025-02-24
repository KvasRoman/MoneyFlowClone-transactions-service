import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Transaction } from './transaction.entity';



@Injectable()
export class TransactionService {
    constructor(@InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>) {
    }

    async getTransactionById(id: string, accountId: string): Promise<Transaction> {
        const transaction = await this.transactionRepository.findOne({ where: { id, accountId } });
        if (!transaction) {
            throw new NotFoundException(`Transaction with ID ${id} not found`);
        }
        return transaction;
    }

    async createTransaction(dto: { accountId: string, amount: number, description?: string, transactionDate: Date }): Promise<Transaction> {
        Logger.log(dto);
        const transaction = this.transactionRepository.create(dto);
        Logger.log(transaction);
        return await this.transactionRepository.save(transaction);
    }

    async updateTransaction(id: string, accountId: string, dto: { amount?: number, description?: string, transactionDate?: Date, currency?: string }): Promise<Transaction> {
        const transaction = await this.getTransactionById(id, accountId);
        Object.assign(transaction, dto);
        return await this.transactionRepository.save(transaction);
    }

    async deleteTransaction(id: string, accountId: string): Promise<void> {
        const result = await this.transactionRepository.delete({ id, accountId });
        if (result.affected === 0) {
            throw new NotFoundException(`Transaction with ID ${id} not found`);
        }
    }

    async getTransactions(accountId: string, page: number, limit: number) {
        const [transactions, total] = await this.transactionRepository.findAndCount({
            where: {
                accountId,
            },
            order: { transactionDate: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });

        return { transactions, total, page, limit };
    }
}
