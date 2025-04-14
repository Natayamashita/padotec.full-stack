import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Inicia o prisma client
// PrismaClient é uma classe que fornece uma interface para interagir com o banco de dados
// Por padrao estamos usando o SQLite devido a facilidade
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}