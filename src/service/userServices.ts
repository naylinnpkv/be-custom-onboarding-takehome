import { PrismaClient, User } from "@prisma/client";
import { CreateUserReqBody, UpdateUserRequestBody } from "../types";

const prisma = new PrismaClient();

class UserService {
  async findAll() {
    return prisma.user.findMany({ include: { address: true } });
  }
  async findUserById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { address: true },
    });
    return user;
  }
  async findUserByEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }
  async create(data: CreateUserReqBody) {
    const user = await prisma.user.create({ data });
    return user;
  }
  async update(data: UpdateUserRequestBody, id: string) {
    if (data.userBasicData) {
      await prisma.user.update({
        data: data.userBasicData,
        where: { id },
      });
    }
    const exisitingAddress = await prisma.address.findUnique({
      where: { userId: id },
    });

    // 'create' if address is last step
    if (data.userAddress && !exisitingAddress) {
      await prisma.address.create({
        data: { ...data.userAddress, userId: id },
      });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      include: { address: true },
    });
    return user;
  }
}

export default new UserService();
