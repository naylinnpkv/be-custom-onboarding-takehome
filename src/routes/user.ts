import express, { Router } from "express";
import userController from "../controllers/userController";
import authenticate from "../middlewares/user";

const router: Router = express.Router();

router.get("/", userController.getAll);
router.get("/user", authenticate, userController.getUserInfo);
router.post("/signin-or-signUp", userController.createOrLogin);

router.post("/update-create-data", authenticate, userController.updateData);

export default router;
