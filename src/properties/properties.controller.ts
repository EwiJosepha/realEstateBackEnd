import { PropertiesService } from "./properties.service";
import { Properties } from "./properties.model";
import { BadRequestException, Body, Controller, Delete, Get,  InternalServerErrorException, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";

@Controller('properties')

export class PropertyController {
  constructor(private readonly propertiesService: PropertiesService) { }


  @Get(":id")
  async getOneProperty(@Param('id') id: number): Promise<Properties> {
    return this.propertiesService.getOneProperty(id)
  }

  @Post()
  async createProperty(@Body() propertyData: Properties): Promise<Properties> {
    return this.propertiesService.postProperties(propertyData)
  }


  @Put(":id")
  async updateProperties(@Param('id') id: number, @Body() createdProperty: Properties): Promise<Properties> {
    return this.propertiesService.updateProperties(id, createdProperty)
  }

  @Delete(":id")
  async deleteProperties(@Param('id') id: number): Promise<Properties> {
    return this.propertiesService.deleteProperties(id)
  }


  @Get('agent/:agentId')
  async getPropertiesByAgentId(@Param('agentId') agentId: string): Promise<Properties[]> {
    const parsedAgentId = parseInt(agentId, 10);
    return this.propertiesService.getPropertiesByAgentId(parsedAgentId);
  }


  @Get('room/:rooms')
  async getRooms(@Param('rooms') rooms: string): Promise<Properties[]> {
    return this.propertiesService.searchByRoom(rooms)
  }

  @Get()
  async getProperties(
    @Query("rooms") rooms: string,
    @Query("type") type: string,
    @Query("bath") bath: string,
    @Query("rentOrSale") rentOrSale: string,
    @Query("price") price: number,
    @Query("areaInKm") areaInKm: number,
    @Query("limit") limit?: string,
    @Query("page") page?: string
  ): Promise<Properties[]> {
    const filter = {};

    const priceParsed = +price;
    const areaInKmParsed = +areaInKm;

    if (bath) {
      filter['bath'] = bath;
    }
    if (rooms) {
      filter['rooms'] = rooms;
    }
    if (rentOrSale) {
      filter['rentOrSale'] = rentOrSale;
    }
    if (type) {
      filter['type'] = type;
    }

    if (priceParsed <= 500000) {
      filter['price'] = {
        lte: priceParsed
      };
    } else if (priceParsed > 500000) {
      filter['price'] = {
        gte: priceParsed
      };
    }

    if (areaInKmParsed <= 950) {
      filter['areaInKm'] = {
        lte: areaInKmParsed
      };
    } else if (areaInKmParsed > 950) {
      filter['areaInKm'] = {
        gte: areaInKmParsed
      };
    }

    if (limit && page) {
      const parsedLimit = parseInt(limit, 10);
      const parsedPage = parseInt(page, 10);
      return this.propertiesService.paginationService(parsedLimit, parsedPage);
    } else {
      return this.propertiesService.getAllPropertiesQueries(filter);
    }
  }

  // @Get()
  // async paginateProperties(
  //   @Query("rooms") rooms: string,
  //   @Query("type") type: string,
  //   @Query("bath") bath: string,
  //   @Query("rentOrSale") rentOrSale: string,
  //   @Query("limit") limit?: string,
  //   @Query("page") page?: string
  // ): Promise<Properties[]> {
  //   const filter = {};
  //   // Populate filter object based on query parameters...
  //   const parsedLimit = limit ? parseInt(limit, 10) : 10;
  //   const parsedPage = page ? parseInt(page, 10) : 1; 
  //   if (parsedLimit && parsedPage) {
  //     return this.propertiesService.paginationService(filter, parsedLimit, parsedPage);

  //   } else {
  //     return this.propertiesService.getAllProperties()
  //   }
  // }
}
