import { Module } from '@nestjs/common';
import { AgentsController } from './controller/agents.controller';
import { AgentService } from './services/agents.service';
import { CityForecastTool } from 'src/app/tools/weather/cityForecast.tool.service';
import { Tools } from 'src/app/tools/tool.service';
import { ConfigService } from '@nestjs/config';
import { CityFutureForecastTool } from 'src/app/tools/weather/cityFutureForecast.tool.service';

@Module({
  imports: [],
  controllers: [AgentsController],
  providers: [
    AgentService,
    CityForecastTool,
    Tools,
    ConfigService,
    CityFutureForecastTool,
  ],
})
export class AgentsModule {}
