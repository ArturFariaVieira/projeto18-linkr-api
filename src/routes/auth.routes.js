import { Router } from "express";
import { signin } from "../controllers/auth.controllers.js";
import { createUser } from "../controllers/users.controllers.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import loginSchema from "../models/loginSchema.js";
import userSchema from "../models/userSchema.js";

const router = Router();

router.post("/sign-up", validateSchema(userSchema), createUser);
router.post("/sign-in", validateSchema(loginSchema), signin);

export default router;
