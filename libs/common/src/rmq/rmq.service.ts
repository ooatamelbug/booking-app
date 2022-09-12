import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

@Injectable()
export class RMQService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(queue: string, noAck = false) {
    return {
      transport: Transport.RMQ,
      option: {
        urls: [this.configService.get<string>('RMQ_NO_URI')],
        queue: this.configService.get<string>(`RMQ_NO_${queue}_QUEUE`),
        noAck,
        persistent: true,
      },
    };
  }
}
