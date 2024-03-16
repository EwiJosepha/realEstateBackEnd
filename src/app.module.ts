import { Module } from '@nestjs/common';
import { AgentModule } from './agent/agent.module';

@Module({
  imports: [AgentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
