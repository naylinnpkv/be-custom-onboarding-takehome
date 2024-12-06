import componentsServices from "../service/componentsServices";
import { Request, Response } from "express";

class StepsController {
  async get(req: Request, res: Response) {
    try {
      const components = await componentsServices.findAll();
      res.status(200).json(components);
    } catch (e) {
      res.status(500).json({ e: "Unable to retrieve components info" });
    }
  }
}

export default new StepsController();
