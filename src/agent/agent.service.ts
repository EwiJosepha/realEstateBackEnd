import { PrismaService } from "./prisma.service";
import { Agent } from "./agent.model";
import { Injectable } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class AgentService {
  constructor(private prisma: PrismaService) { }

  async getAllAgent(): Promise<Agent[]> {

    return this.prisma.agent.findMany();

  }

  // async getAgent(id: number, req: Request): Promise<Agent | null> {

  //   return this.prisma.agent.findUnique({ where: { id: Number(id) } });
  // }

  async createAgent(data: Agent): Promise<Agent> {
    return this.prisma.agent.create({
      data,
    });
  }

  async updateAgent(id: number, data: Agent): Promise<Agent | null> {
    return this.prisma.agent.update({
      where: { id: Number(id) },
      data,
    });
  }
  async deleteAgent(id: number): Promise<void> {
    await this.prisma.agent.delete({
      where: {
        id: id,
      },
    });
  }

}





