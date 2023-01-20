import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly recipient_id: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly bot_name: string;

  readonly client_message: string;

  readonly bot_responses: object[];

  readonly context: object;

  readonly channel: string;

  readonly sent_at: string;

  readonly parameters: object;
}
