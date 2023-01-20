import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Interaction, InteractionDocument } from './schemas/interaction.schema';
import { CreateInteractionDto } from './dto/create-interaction.dto';
@Injectable()
export class InteractionsService {
  constructor(
    @InjectModel(Interaction.name)
    private interactionModel: Model<InteractionDocument>,
  ) {}
  async create(
    interaction: CreateInteractionDto,
  ): Promise<InteractionDocument> {
    const createdInteraction = new this.interactionModel(interaction);
    return createdInteraction.save();
  }
}
