
import { PropertiesService } from "./properties.service";
import { Properties } from "@prisma/client";
import { BadRequestException, Body, Controller, Delete, Get, HttpException, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";

@Controller('properties')

export class PropertyController {
  constructor(private readonly propertiesService: PropertiesService) { }


  // @Get()
  // async getAllProperties(): Promise<Properties[]> {
  //   return this.propertiesService.getAllProperties()
  // }

  @Post()

  async createProperty(@Body() propertyData: Properties): Promise<Properties> {
    return this.propertiesService.postProperties(propertyData)
  }

  @Get(":id")
  async getOneProperty(@Param('id') id: number): Promise<Properties> {
    return this.propertiesService.getOneProperty(id)
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


  @Get("/rentOrSale")
  async getRentOrSale(@Query('rentOrSale') rentOrSale: string): Promise<Properties[]> {

    try {
      if (!rentOrSale) {
        throw new BadRequestException('RentOrSale parameter is required');
      }

      const properties = await this.propertiesService.searchRentOrSale(rentOrSale);

      if (!properties || properties.length === 0) {
        throw new NotFoundException('No properties found with the given rentOrSale');
      }

      return properties;
    } catch (error) {
      // Properly handle errors
      if (error instanceof HttpException) {
        throw error; // Re-throw HttpException with proper status code
      } else {
        throw new InternalServerErrorException('Internal server error occurred');
      }
    }
  }




  @Get()
  async getAllQueries(
    @Query("rooms") rooms: string,
    @Query("type") type: string,
    @Query("bath") bath: string,
    @Query("rentOrSale") rentOrSale: string,
    @Query("price") price: number,
    // @Query("limit") limit?: string,
    // @Query("page") page?: string
  ): Promise<Properties[]> {
    const filter = {};
    const priceParsed = +price
    console.log(priceParsed);
    

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

    if(priceParsed < 500000){
      filter['price'] = +price
    }else{
      throw new BadRequestException("querry not found")
    }

    // Parse limit and page as integers
    // const parsedLimit = limit ? parseInt(limit, 10) : undefined;
    // const parsedPage = page ? parseInt(page, 10) : undefined;

    // Call getAllPropertiesQueries with filter object
    if (filter) {
      return this.propertiesService.getAllPropertiesQueries(filter)

    } else {
      return this.propertiesService.getAllProperties()

    }
  }

  @Get()
  async paginateProperties(
    @Query("rooms") rooms: string,
    @Query("type") type: string,
    @Query("bath") bath: string,
    @Query("rentOrSale") rentOrSale: string,
    @Query("limit") limit?: string,
    @Query("page") page?: string
  ): Promise<Properties[]> {
    const filter = {};
    // Populate filter object based on query parameters...
    const parsedLimit = limit ? parseInt(limit, 10) : 10; // Default limit to 10 if not provided
    const parsedPage = page ? parseInt(page, 10) : 1; // Default page to 1 if not provided
    if (parsedLimit && parsedPage) {
      return this.propertiesService.paginationService(filter, parsedLimit, parsedPage);

    } else {
      return this.propertiesService.getAllProperties()
    }
  }
}


// @Get()
// async getPagination(@Query("limit", ParseIntPipe) limit:number, @Query("page", ParseIntPipe) page: number): Promise<Properties[]> {
//   return this.propertiesService.pagination(limit, page)
// } 




