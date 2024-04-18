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
      where: { agentId: Number(agentId) },
      include: {
        agent: true
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

  async searchTypes(type: string): Promise<Properties[]> {
    return this.prisma.properties.findMany({
      where: {
        type: type
      }
    })
  }

  async searchRentOrSale(rentOrSale: string): Promise<Properties[]> {
    return this.prisma.properties.findMany({
      where: {
        rentOrSale: rentOrSale
      }
    })
  }

  async getAllPropertiesQueries(filter: any,): Promise<Properties[]> {
    return this.prisma.properties.findMany({
      where: filter
    })
  }

  async paginationService(filter: any, limit: number, page: number): Promise<Properties[]> {
    const skip = limit * (page - 1);
    return this.prisma.properties.findMany({ where: filter, take: limit, skip: skip });
  }

  async postProperties(data: Properties): Promise<Properties> {
    return this.prisma.properties.create({
      data
    });
  }

  async updateProperties(id: number, data: Properties): Promise<Properties> {
    const { images, ..._data } = data;

    return this.prisma.properties.update({
      where: { id: Number(id) },
      data: _data
    })
  }

  async deleteProperties(id: number): Promise<Properties> {
    return this.prisma.properties.delete({
      where: { id: Number(id) }
    })
  }

  async searchRoomsBaths(rooms: string, bath: string): Promise<Properties[]> {
    return this.prisma.properties.findMany({
      where: {
        rooms,
        bath
      }
    })
  }
}



