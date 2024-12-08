import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userServices from "../service/userServices";
import { Request, Response } from "express";

class UserController {
  async createOrLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const existingUser = await userServices.findUserByEmail(email);
      if (existingUser) {
        const isPasswordValid = await bcrypt.compare(
          password,
          existingUser.password
        );
        if (!isPasswordValid) {
          res.status(401).json({ message: "Invalid password" });
          return;
        }

        const token = jwt.sign(
          { userId: existingUser.id },
          process.env.JWT_SECRET!,
          { expiresIn: "1d" }
        );

        res.status(200).json({
          token,
          user: existingUser,
          message: "Login successful!",
        });
      }

      const hashedPw = await bcrypt.hash(password, 10);
      const user = await userServices.create({ email, password: hashedPw });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });

      res.status(200).json({
        token,
        user,
        message: "Account created successfully",
      });
    } catch (e: any) {
      console.error("Error in createOrLogin:", e); // Log the error to console
      res
        .status(500)
        .json({ message: "Internal server error", error: e.message });
    }
  }
  async updateData(req: Request, res: Response) {
    try {
      await userServices.update(req.body.data, req.body.userId);

      //   res.status(200).json(user);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Error updating user info" });
    }
  }
  async getUserInfo(req: Request, res: Response) {
    const { userId } = req.body;

    try {
      const user = await userServices.findUserById(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ message: "Error retrieving user info" });
    }
  }
}

export default new UserController();
