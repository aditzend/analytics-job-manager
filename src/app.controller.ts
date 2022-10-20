import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  logger: Logger = new Logger('AppController');

  @EventPattern('helsinki-event')
  async handleJobCreatedEvent(data: Record<string, unknown>) {
    this.logger.log(`Job Created Event: ${JSON.stringify(data)}`);
  }
  @EventPattern({
    group: 'conversations',
    event: 'message',
    processor: 'T1',
    emitter: 'bot-api',
  })
  async handleHelsinkiCreatedEvent(data: Record<string, unknown>) {
    this.logger.log(`T1 does: ${JSON.stringify(data)}`);
  }
  @EventPattern({
    group: 'conversations',
    event: 'message',
    processor: 'T2',
    emitter: 'bot-api',
  })
  async t2Event(data: Record<string, unknown>) {
    this.logger.log(`T2 does: ${JSON.stringify(data)}`);
  }
}
