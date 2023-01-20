interface MessageSearchBody {
  recipient_id: string;
  bot_name: string;
  client_message: string;
  bot_responses: BotResponseMessage[];
  context?: {
    slots?: object;
    intent?: object;
    entities?: object[];
    rasa_message_id: string;
    action_name: string;
  };
  channel: string;
  sent_at: string;
  parameters: object;
}
