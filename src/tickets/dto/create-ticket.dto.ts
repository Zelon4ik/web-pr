export class CreateTicketDto {
  readonly title: string;
  readonly price: number;
  readonly venue: string;
  readonly sector: string;
  readonly seatNumber: number | string;
}
