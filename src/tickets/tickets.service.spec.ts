import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from './tickets.service.js';
import { NotFoundException } from '@nestjs/common';

describe('TicketsService', () => {
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketsService],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all initial tickets', () => {
      const tickets = service.findAll();
      expect(tickets.length).toBe(3);
    });

    it('should filter by title search query', () => {
      const tickets = service.findAll('Imagine');
      expect(tickets.length).toBe(1);
      expect(tickets[0].title).toContain('Imagine Dragons');
    });

    it('should limit result count', () => {
      const tickets = service.findAll(undefined, '2');
      expect(tickets.length).toBe(2);
    });
  });

  describe('findOne', () => {
    it('should return a ticket by id', () => {
      const ticket = service.findOne('1');
      expect(ticket).toBeDefined();
      expect(ticket.id).toBe('1');
    });

    it('should throw NotFoundException if ticket not found', () => {
      expect(() => service.findOne('99999')).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a new ticket', () => {
      const newTicket = service.create({
        title: 'Тестовий концерт',
        price: 500,
        venue: 'Арена',
        sector: 'B',
        seatNumber: 10,
      });

      expect(newTicket.id).toBeDefined();
      expect(newTicket.title).toBe('Тестовий концерт');
      expect(service.findOne(newTicket.id)).toEqual(newTicket);
    });
  });

  describe('update', () => {
    it('should update and return the ticket', () => {
      const updated = service.update('1', { price: 3000 });
      expect(updated.price).toBe(3000);
      expect(service.findOne('1').price).toBe(3000);
    });

    it('should throw NotFoundException when updating non-existent ticket', () => {
      expect(() => service.update('99999', { price: 3000 })).toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a ticket', () => {
      service.remove('1');
      expect(() => service.findOne('1')).toThrow(NotFoundException);
    });

    it('should throw NotFoundException when deleting non-existent ticket', () => {
      expect(() => service.remove('99999')).toThrow(NotFoundException);
    });
  });
});
