/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { Tools } from 'src/app/tools/tool.service';

interface GetAnswerResponse {
  answer: string;
}

@Injectable()
export class AgentService {
  private llm: ChatOpenAI;
  private agent: ReturnType<typeof createReactAgent>;
  constructor(private tools: Tools) {
    this.llm = new ChatOpenAI({
      temperature: 0,
      modelName: 'gpt-4.1-mini',
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    this.agent = createReactAgent({
      llm: this.llm,
      tools: this.tools.getTools(),
    });
  }
  async getAnswer(question: string): Promise<GetAnswerResponse> {
    const response = await this.agent.invoke({
      messages: [
        {
          role: 'user',
          content: question,
        },
      ],
    });

    if (response.error) {
      throw new Error(`Error: ${response.error.message}`);
    } else {
      return {
        answer: response.messages[response.messages.length - 1].content,
      };
    }
  }
}
