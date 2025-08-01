export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  start: Date;
  end: Date;
  createdAt: Date;
  source?: string;
}
