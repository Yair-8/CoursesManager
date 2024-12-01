import express from "express";
import LoginController from "../controllers/loginController.mjs";

const router = express.Router();

router.get("/login", LoginController.loginForm);
router.post("/login", LoginController.authUser);
router.get("/logout", LoginController.logout);

export default router;
