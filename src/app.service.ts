import { Injectable } from '@nestjs/common';
import { DeleteDTO, PatchDTO, PutDTO } from './app.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaClient) {}

  put(body: PutDTO) {
    // Here you can also add business logic or call use cases
    // if you are following a clean architecture

    const data = {
      amount: body.data.amount,
      description: body.data.description,
      createdBy: body.data.createdBy,
    };

    switch (body.table) {
      case 'Expenses':
        return this.prisma.expenses.upsert({
          where: {
            id: body.data.id,
          },
          update: data,
          create: data,
        });

      default:
        throw new Error('Invalid table');
    }
  }

  async delete(body: DeleteDTO) {
    // Here you can also add business logic or call use cases
    switch (body.table) {
      case 'Expenses':
        return this.prisma.expenses.delete({
          where: {
            id: body.data.id,
          },
        });

      default:
        throw new Error('Invalid table');
    }
  }

  patch(body: PatchDTO) {
    // Here you can also add business logic or call use cases
    switch (body.table) {
      case 'Expenses':
        return this.prisma.expenses.update({
          where: {
            id: body.data.id,
          },
          data: {
            amount: body.data.amount,
            description: body.data.description,
            createdBy: body.data.createdBy,
          },
        });

      default:
        throw new Error('Invalid table');
    }
  }
}
