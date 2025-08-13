// src/tools/weather/weather-tools.provider.ts
import { Injectable } from '@nestjs/common';
import { CityForecastTool } from './weather/cityForecast.tool.service';
import { CityFutureForecastTool } from './weather/cityFutureForecast.tool.service';

@Injectable()
export class Tools {
  constructor(
    private readonly cityForecastTool: CityForecastTool,
    private readonly cityFutureForecast: CityFutureForecastTool,
  ) {}

  getTools() {
    return [this.cityFutureForecast.getTool(), this.cityForecastTool.getTool()];
  }
}
