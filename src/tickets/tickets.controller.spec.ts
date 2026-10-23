import { Test, TestingModule } from '@nestjs/testing';
import { TicketsController } from './tickets.controller.js';
import { TicketsService } from './tickets.service.js';

describe('TicketsController', () => {
  let controller: TicketsController;
  let service: TicketsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsController],
      providers: [TicketsService],
    }).compile();

    controller = module.get<TicketsController>(TicketsController);
    service = module.get<TicketsService>(TicketsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should return array of tickets', () => {
    const result = controller.findAll();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);
  });

  it('findOne should return one ticket', () => {
    const result = controller.findOne('1');
    expect(result.id).toBe('1');
  });

  it('create should return new ticket', () => {
    const result = controller.create({
      title: 'Концерт',
      price: 1000,
      venue: 'Клуб',
      sector: 'VIP',
      seatNumber: 1,
    });
    expect(result.id).toBeDefined();
    expect(result.title).toBe('Концерт');
  });

  it('update should return updated ticket', () => {
    const result = controller.update('1', { price: 2999 });
    expect(result.price).toBe(2999);
  });

  it('remove should delete ticket', () => {
    expect(() => controller.remove('1')).not.toThrow();
  });
});
