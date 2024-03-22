import { Module } from '@nestjs/common';
import { AgentModule } from './agent/agent.module';
import { PropertiesModule } from './properties/properties.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AgentModule,PropertiesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
