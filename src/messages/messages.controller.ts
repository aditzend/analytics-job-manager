import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  logger: Logger = new Logger('MessagesController');

  @EventPattern({
    group: 'conversations',
    sent_by: 'bot-api',
    to_processor: 'T1',
  })
  async handleT1MessageEvent(
    @Payload() data: CreateMessageDto,
    @Ctx() context: RmqContext,
  ) {
    const mongoSaved = await this.messagesService.create(data);
    this.logger.log(`T1 saved to mongodb: ${JSON.stringify(mongoSaved)}`);

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
  @EventPattern({
    group: 'conversations',
    sent_by: 'bot-api',
    to_processor: 'T2',
  })
  async t2Event(@Payload() data: CreateMessageDto, @Ctx() context: RmqContext) {
    const mongoId = await this.messagesService.create(data);
    this.logger.log(`T2 does: ${JSON.stringify(mongoId)}`);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
  }
  @EventPattern({
    group: 'test',
  })
  async t2SpeechEvent(data: Record<string, unknown>) {
    this.logger.log(`T2 does speech: ${JSON.stringify(data)}`);
  }
}
