
import { PropertiesService } from "./properties.service";
import { Properties } from "@prisma/client";
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { PropertiesWithAgent } from "./properties.model";

@Controller('properties')

export class PropertyController {
  constructor(private readonly propertiesService: PropertiesService) {}

 
  @Get()
  async getAllProperties():Promise<Properties[]> {
    return this.propertiesService.getAllProperties()
  }

  @Post()

  async createProperty(@Body() propertyData: Properties):Promise<Properties> {
    return this.propertiesService.postProperties(propertyData)
  }

  @Get(":id")
  async getOneProperty(@Param('id') id: number):Promise<Properties> {
      return this.propertiesService.getOneProperty(id)
  }

  @Put(":id")
  async updateProperties(@Param('id') id: number, @Body()createdProperty: Properties):Promise<Properties> {
    return this.propertiesService.updateProperties(id, createdProperty)
  }

  @Delete(":id")
  async deleteProperties(@Param('id') id:number):Promise<Properties>{
    return this.propertiesService.deleteProperties(id)
  }


  @Get()
  async getAllPropertieswithAgentId(@Query('agentId') agentId: number): Promise<Properties[]> {
    if (agentId === 1) {
      // Return properties where agentId equals 1
      return this.propertiesService.getPropertiesByAgentId(agentId);
    } else {
      // Return all properties
      return this.propertiesService.getAllProperties();
    }
  }
}


