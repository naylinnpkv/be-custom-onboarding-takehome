import express, { Router } from "express";
import componentsController from "../controllers/componentsController";
const router: Router = express.Router();

router.get("/", componentsController.get);
router.put("/update", componentsController.update);

export default router;
