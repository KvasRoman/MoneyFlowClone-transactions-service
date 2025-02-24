import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction } from './transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([Transaction])
  ],
  providers: [TransactionService],
  controllers: [TransactionController]
})
export class TransactionModule {}
