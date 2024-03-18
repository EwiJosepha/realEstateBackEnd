import { Prisma, Properties, Agent } from "@prisma/client";

//  export class Properties implements Prisma.PropertiesCreateInput{
//   id: number;
//   name: string;
//   type:string;
//   description: string;
//   rooms: string;
//   bath: number;
//   livingRooms: string;
//   location: string;
//   price: number;
//   areaInKm: string;
//   rentOrSale: string;
//   shortDescription: string;
//   images: string[];
//   agent:  Prisma.AgentCreateNestedOneWithoutPropertiesInput;
//   agentId: number;
//  }


interface PropertiesWithAgent extends Properties {
  agent: Agent;
}

export type {
  PropertiesWithAgent,
}
