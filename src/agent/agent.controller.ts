import { AgentService } from "./agent.service";
import { Agent } from "./agent.model";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

@Controller('api/v1/agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}


  @Get()
  async getAllAgent(): Promise<Agent[]> {
    return this.agentService.getAllAgent()
  }

  @Post()
  async postAgent(@Body() postData: Agent): Promise<Agent> {
    return this.agentService.createAgent(postData)
  }

  @Get(':id')
  async getAgent(@Param('id') id: number):Promise<Agent>{
    return this.agentService.getAgent(id)
  }

  @Delete(':id')
  async deletAgent(@Param('id') id: number):Promise<Agent>{
    return this.agentService.deleteAgent(+id)
  }
  
  @Put(':id')
  async updateAgent(@Param('id') id: number,@Body()postAgent: Agent):Promise<Agent>{
    return this.agentService.updateAgent(id, postAgent)
  }
}