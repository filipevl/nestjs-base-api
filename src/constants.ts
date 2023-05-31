import { genSalt } from 'bcrypt';

export const PG_CONNECTION = 'PG_CONNECTION';
export const SALT = genSalt();
