 import { Prisma } from "@prisma/client";
 import {Agent} from "../agent/agent.model"

 export class Properties implements Prisma.PropertiesCreateInput{
  id: number;
  name: string;
  type:string;
  description: string;
  rooms: string;
  bath: number;
  livingRooms: string;
  location: string;
  price: number;
  areaInKm: string;
  rentOrSale: string;
  shortDescription: string;
  images: string[];
  agent:  Prisma.AgentCreateNestedOneWithoutPropertiesInput;
  agentId: number;
 }