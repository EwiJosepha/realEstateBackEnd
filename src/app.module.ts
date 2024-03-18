import { Module } from '@nestjs/common';
import { AgentModule } from './agent/agent.module';
import { PropertiesModule } from './properties/properties.module';

@Module({
  imports: [AgentModule,PropertiesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
