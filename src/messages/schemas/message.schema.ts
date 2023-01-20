import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MessageDocument = Message & Document;

/**
 * Convert this into a class
 * {"recipient_id":"345345sdf",
 * "bot_name":"a_b_assistant_v1",
 * "client_message":"/start",
 * "bot_responses":[{"message":"utter_start","event_name":"*text"},{"message":"utter_menu","event_name":"*text"}],
 * "context":{"slots":{"ciudad_destino":null,ciudad_origen":null,disambiguation_message":null,"fallback_language":"es","requested_slot":null,"user_channel":null,"user_client_id":null,"user_dni":null,"user_email":null,"user_mail":null,"user_name":null,"user_work_email":null,"session_started_metadata":null},
 * "intent":{"name":"start","confidence":1},
 * "entities":[],
 * "rasa_message_id":"1d844d0bb89b4862be3eef4b748b158f",
 * "action_name":"action_listen"},
 * "channel":"SMS",
 * "sent_at":"2022-11-01T11:54:39.485Z",
 * "parameters":{"analytics_processor":"T2","analytics_group":"conversations"}}
 */

@Schema()
export class Message {
  @Prop()
  recipient_id: string;

  @Prop()
  bot_name: string;

  @Prop()
  client_message: string;

  @Prop()
  bot_responses: object[];

  @Prop({ type: Object })
  slots: object;

  @Prop()
  channel: string;

  @Prop()
  sent_at: string;

  @Prop({ type: Object })
  parameters: object;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
