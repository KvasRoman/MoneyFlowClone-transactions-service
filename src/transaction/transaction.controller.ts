import { Controller, Inject, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(@Inject() private readonly transactionService: TransactionService) {
    }
    @MessagePattern({ cmd: 'get_transactions' })
    async getTransactions(@Payload() payload: { accountId: string, page: number, limit: number }) {
        
        try {
            return await this.transactionService.getTransactions(
                payload.accountId,
                payload.page,
                payload.limit
            );
        }
        catch (e) {
            return e
        }
    }
    @MessagePattern({ cmd: 'get_single_transaction' })
    async getSingleTransaction(@Payload() payload: { id: string, accountId: string }) {
        try {
            return await this.transactionService.getTransactionById(
                payload.id, 
                payload.accountId
            );
        }
        catch (e) {
            return e
        }
    }
    @MessagePattern({ cmd: 'create_transaction' })
    async createTransaction(@Payload() payload: { accountId: string, amount: number, description?: string, transactionDate: Date, currency: string }){
        try {
            const res = await this.transactionService.createTransaction(payload);
            return res;
        }
        catch (e) {
            return e
        }
    }
    @MessagePattern({ cmd: 'update_transaction' })
    async updateTransaction(@Payload() payload: { id: string; accountId: string; dto: { amount?: number, description?: string, transactionDate?: Date, currency?:string } }) {
        try {
            return await this.transactionService.updateTransaction(
                payload.id, 
                payload.accountId, 
                payload.dto
            );
        }
        catch (e) {
            return e
        }
    }
    @MessagePattern({ cmd: 'delete_transaction' })
    async deleteTransaction(@Payload() payload: { id: string; accountId: string }) {
        try {
            await this.transactionService.deleteTransaction(
                payload.id, 
                payload.accountId
            );
            return {message: "complete"};
        }
        catch (e) {
            return e
        }
    }
}
