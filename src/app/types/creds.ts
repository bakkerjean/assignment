import { User } from './user';

export interface Creds extends User {
  password: string;
}
