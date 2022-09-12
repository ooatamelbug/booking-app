import { ConfigService } from '@nestjs/config';
import { RMQService } from './rmq.service';
import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, RmqContext, Transport } from '@nestjs/microservices';

export interface RMQModuleOpt {
  name: string;
}

@Module({
  providers: [RMQService],
  exports: [RMQService],
})
export class RMQModule {
  static register({ name }: RMQModuleOpt): DynamicModule {
    return {
      module: RMQModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RMQ_NO_URI')],
                queue: configService.get<string>(`RMQ_NO_${name}_QUEUE`),
                queueOptions: {
                  durabe: configService.get<string>('RMQ_NO_DURABLE'),
                },
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
    };
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }
}
