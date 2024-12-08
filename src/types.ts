import { User, Address } from "@prisma/client";

export type CreateUserReqBody = Partial<Omit<User, "email" | "password">> & {
  email: string;
  password: string;
};

export interface UpdateUserRequestBody {
  userBasicData?: Partial<User>;
  userAddress?: Address;
  userId: string;
}
