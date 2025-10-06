import { Module } from '@nestjs/common';
import { envConfiguration } from '../config/config.service';
import { ConfigModule } from '@nestjs/config';
import { AgentsModule } from './agents/agents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration],
      envFilePath: ['.env', '.env.development'],
    }),
    AgentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
