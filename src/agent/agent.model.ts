import { Prisma } from "@prisma/client";

export class Agent implements Prisma.AgentCreateInput {
  id: number;
  name: string;
  email: string;
}