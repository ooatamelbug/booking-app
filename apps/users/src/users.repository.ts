import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly data) {}
  async create() {}
}
