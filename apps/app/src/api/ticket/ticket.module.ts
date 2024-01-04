// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import { TypeOrmExModule } from '../../repository/typeorm-ex.module';
import TicketController from './controller/ticket.controller';
import TicketService from './service/ticket.service';

// ** entity Imports

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    TypeOrmExModule.forCustomRepository([]),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [TicketController],
  providers: [TicketService],
})
export default class TicketModule {}
