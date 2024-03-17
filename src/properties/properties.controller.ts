
import { PropertiesService } from "./properties.service";
import { Properties } from "../properties/properties.model";
import { Get } from "@nestjs/common";

export class AgentController {
  constructor(private readonly propertiesService: PropertiesService) { }

 
  // async getAllProperties():Promise<Properties[]> {
  //   return this.propertiesService.getAllProperties()
  // }
}