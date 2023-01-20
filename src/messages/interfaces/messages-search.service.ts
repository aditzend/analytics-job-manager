import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export default class MessagesSearchService {
  index = 'messages';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexTest() {
    return this.elasticsearchService.index({
      index: 'conversation',
      body: {
        title: 'Test',
      },
    });
  }
}
