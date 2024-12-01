import express from "express";
import CourseController from "../controllers/courseController.mjs";
import { checkSchema } from "express-validator";

const router = express.Router();

router.get("/", CourseController.getList);
router.get("/register/:id?", CourseController.registerForm);
router.post("/register/:id?", CourseController.register);
router.delete("/", CourseController.delete);

router.post("/seminars/:courseId", CourseController.createSeminar);
router.delete("/seminars/:courseId", CourseController.deleteSeminar);
export default router;
