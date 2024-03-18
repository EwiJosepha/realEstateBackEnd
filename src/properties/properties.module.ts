import { PropertiesService } from "./properties.service";
import { PropertyController } from "./properties.controller";
import { PrismaService } from "./prisma.service";
import { Module } from "@nestjs/common";

@Module({
  controllers: [PropertyController],
  providers: [PropertiesService, PrismaService],
})

export class PropertiesModule{}
