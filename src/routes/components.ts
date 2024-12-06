import express, { Router } from "express";
import componentsController from "../controllers/componentsController";
const router: Router = express.Router();

router.get("/", componentsController.get);

export default router;
