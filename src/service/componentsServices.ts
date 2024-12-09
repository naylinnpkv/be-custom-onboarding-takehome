import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ComponentService {
  async findAll() {
    return prisma.component.findMany();
  }
  async updateAll(data: Array<{ id: string; step: number }>) {
    const updatePromises = data.map((item) =>
      prisma.component.update({
        where: { id: item.id },
        data: { step: item.step },
      })
    );

    await Promise.all(updatePromises);
    const components = await prisma.component.findMany();
    return components;
  }
}

export default new ComponentService();
