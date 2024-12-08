import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ComponentService {
  async findAll() {
    return prisma.component.findMany();
  }
}

export default new ComponentService();
