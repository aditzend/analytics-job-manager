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
    sent_by: 'bot-api',
    to_processor: 'T1',
  })
  async handleHelsinkiCreatedEvent(data: Record<string, unknown>) {
    // this.logger.log(`T1 does: ${JSON.stringify(data)}`);
    this.logger.log('T1 got this job', data.recipient_id);
  }
  @EventPattern({
    group: 'conversations',
    sent_by: 'bot-api',
    to_processor: 'T2',
  })
  async t2Event(data: Record<string, unknown>) {
    this.logger.log(`T2 does: ${JSON.stringify(data)}`);
  }
  @EventPattern({
    group: 'speech-analytics',
    sent_by: 'bot-api',
    to_processor: 'T2',
  })
  async t2SpeechEvent(data: Record<string, unknown>) {
    this.logger.log(`T2 does speech: ${JSON.stringify(data)}`);
  }
}
