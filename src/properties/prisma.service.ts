import { PrismaClient } from "@prisma/client";
import { INestApplication, Injectable } from "@nestjs/common";
import { OnModuleInit } from "@nestjs/common";

@Injectable()

export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect()
  }

  async enableShutDownProperties(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    })

  }
}
