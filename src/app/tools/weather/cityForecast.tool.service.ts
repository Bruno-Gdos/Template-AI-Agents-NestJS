import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { ConfigService } from '@nestjs/config';
import { tool } from '@langchain/core/tools';

@Injectable()
export class CityForecastTool {
  constructor(private readonly configService: ConfigService) {}

  getTool() {
    return tool(
      async ({ city }) => {
        const baseUrl = 'https://api.weatherapi.com/v1';
        const apiKey = this.configService.get('WEATHER_API_KEY');

        const url = `${baseUrl}/current.json?q=${encodeURIComponent(city)}&key=${apiKey}`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `Error fetching weather data: ${response.statusText}`,
          );
        }

        return response.json();
      },
      {
        name: 'city_forecast',
        description: 'Get the current weather forecast for a specific city.',
        schema: z.object({
          city: z
            .string()
            .describe('The name of the city to get the forecast for.'),
        }),
      },
    );
  }
}
