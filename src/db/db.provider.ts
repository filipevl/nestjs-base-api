import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DbProvider {
  pool = new Pool();
}
