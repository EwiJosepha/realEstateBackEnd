import { PrismaService } from "./prisma.service";
import { Properties, Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";


@Injectable()

export class PropertiesService {
  constructor(private prisma: PrismaService) { }

  async getAllProperties(): Promise<Properties[]> {
    return this.prisma.properties.findMany()
  }

  async getOneProperty(id: number): Promise<Properties> {
    return this.prisma.properties.findUnique({
      where: { id: Number(id) },
      include: {
        agent: true,
      }
    })
  }

  async getPropertiesByAgentId(agentId: number): Promise<Properties[]> {
    return this.prisma.properties.findMany({
      where: {agentId: Number(agentId)} ,
      include : {
        agent : true
      }
    });
  }

  async searchByRoom(rooms: string): Promise<Properties[]> {
    return this.prisma.properties.findMany({
      where: {
        rooms: rooms
      }
    })
  }

  async postProperties(data: Properties): Promise<Properties> {
    return this.prisma.properties.create({
      data
    });
  }

  async updateProperties(id: number, data: Properties): Promise<Properties> {
    return this.prisma.properties.update({
      where: { id: Number(id) },
      data: { type: data.type }
    })
  }

  async deleteProperties(id: number): Promise<Properties> {
    return this.prisma.properties.delete({
      where: { id: Number(id) }
    })
  }
}



