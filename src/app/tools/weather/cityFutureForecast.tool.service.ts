import { Injectable } from '@nestjs/common';
import { z } from 'zod';
import { ConfigService } from '@nestjs/config';
import { tool } from '@langchain/core/tools';

@Injectable()
export class CityFutureForecastTool {
  constructor(private readonly configService: ConfigService) {}

  getTool() {
    return tool(
      async ({ city, days }) => {
        const baseUrl = 'https://api.weatherapi.com/v1';
        const apiKey = this.configService.get('WEATHER_API_KEY');

        let url = `${baseUrl}/forecast.json?q=${encodeURIComponent(city)}&key=${apiKey}`;

        if (days) {
          if (isNaN(Number(days))) {
            throw new Error('Days parameter must be a number');
          }
          if (days < 1 || days > 14) {
            throw new Error('Days parameter must be between 1 and 14');
          }
          url += `&days=${days}`;
        }
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `Error fetching weather data: ${response.statusText}`,
          );
        }

        return response.json();
      },
      {
        name: 'city_future_forecast',
        description: 'Get the Future weather forecast for a specific city.',
        schema: z.object({
          city: z
            .string()
            .describe('The name of the city to get the forecast for.'),
          days: z
            .number()
            .optional()
            .describe('The number of days to forecast.'),
        }),
      },
    );
  }
}
