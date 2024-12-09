import componentsServices from "../service/componentsServices";
import { Request, Response } from "express";

class ComponentsController {
  async get(req: Request, res: Response) {
    try {
      const components = await componentsServices.findAll();
      res.status(200).json(components);
    } catch (e) {
      res.status(500).json({ e: "Unable to retrieve components info" });
    }
  }
  async update(req: Request, res: Response) {
    try {
      const components = await componentsServices.updateAll(req.body.data);
      res.status(200).json(components);
    } catch (e) {
      res.status(500).json({ e: `${e}, error updating the components order` });
    }
  }
}

export default new ComponentsController();
