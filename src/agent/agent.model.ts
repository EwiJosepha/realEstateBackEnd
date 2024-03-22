import { Prisma } from "@prisma/client";

export class Agent implements Prisma.AgentCreateInput {
  id: number;
  email: string;
  name?: string;
  hashpassword: string
}