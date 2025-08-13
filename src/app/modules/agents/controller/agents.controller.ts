import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AgentService } from '../services/agents.service';

@Controller('/agents')
export class AgentsController {
  constructor(private readonly agentService: AgentService) {}

  @Post('/question')
  async getAnswer(@Body() body: { question: string }): Promise<any> {
    try {
      // Here you would call your service to get the answer
      return await this.agentService.getAnswer(body.question);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error processing your request');
    }
  }
}
