import { Injectable, NotFoundException } from '@nestjs/common';
import { Ticket } from './entities/ticket.entity.js';
import { CreateTicketDto } from './dto/create-ticket.dto.js';
import { UpdateTicketDto } from './dto/update-ticket.dto.js';

@Injectable()
export class TicketsService {
  private items: Ticket[] = [
    {
      id: '1',
      title: 'Концерт Imagine Dragons',
      price: 2200,
      venue: 'НСК Олімпійський',
      sector: 'Sector A',
      seatNumber: 15,
    },
    {
      id: '2',
      title: 'Вистава Гамлет',
      price: 650,
      venue: 'Театр ім. Івана Франка',
      sector: 'Партер',
      seatNumber: 8,
    },
    {
      id: '3',
      title: 'Концерт Океан Ельзи',
      price: 1800,
      venue: 'Палац Спорту',
      sector: 'Fan-зона 1',
      seatNumber: 'Вільна посадка',
    },
  ];

  findAll(search?: string, limit?: string): Ticket[] {
    let result = [...this.items];

    if (search) {
      const lowerSearch = search.toLowerCase();
      result = result.filter((item) =>
        item.title.toLowerCase().includes(lowerSearch),
      );
    }

    if (limit) {
      const parsedLimit = parseInt(limit, 10);
      if (!isNaN(parsedLimit) && parsedLimit > 0) {
        result = result.slice(0, parsedLimit);
      }
    }

    return result;
  }

  findOne(id: string): Ticket {
    const item = this.items.find((ticket) => ticket.id === id);
    if (!item) {
      throw new NotFoundException(`Сутність з ID ${id} не знайдена`);
    }
    return item;
  }

  create(dto: CreateTicketDto): Ticket {
    const newTicket: Ticket = {
      id: Date.now().toString(),
      ...dto,
    };
    this.items.push(newTicket);
    return newTicket;
  }

  update(id: string, dto: UpdateTicketDto): Ticket {
    const ticketIndex = this.items.findIndex((ticket) => ticket.id === id);
    if (ticketIndex === -1) {
      throw new NotFoundException(`Сутність з ID ${id} не знайдена`);
    }

    const currentTicket = this.items[ticketIndex];
    const updatedTicket: Ticket = {
      ...currentTicket,
      ...(dto.title !== undefined && { title: dto.title }),
      ...(dto.price !== undefined && { price: dto.price }),
      ...(dto.venue !== undefined && { venue: dto.venue }),
      ...(dto.sector !== undefined && { sector: dto.sector }),
      ...(dto.seatNumber !== undefined && { seatNumber: dto.seatNumber }),
    };

    this.items[ticketIndex] = updatedTicket;
    return updatedTicket;
  }

  remove(id: string): void {
    const ticketIndex = this.items.findIndex((ticket) => ticket.id === id);
    if (ticketIndex === -1) {
      throw new NotFoundException(`Сутність з ID ${id} не знайдена`);
    }
    this.items.splice(ticketIndex, 1);
  }
}
