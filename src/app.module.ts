import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TicketsController } from './tickets/tickets.controller.js';
import { TicketsService } from './tickets/tickets.service.js';

@Module({
  imports: [],
  controllers: [AppController, TicketsController],
  providers: [AppService, TicketsService],
})
export class AppModule {}
