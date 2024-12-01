import express from "express";
import StudentController from "../controllers/studentController.mjs";
import StudentValidator from "../validators/studentValidator.mjs";
import { checkSchema } from "express-validator";

const router = express.Router();

router.get("/", StudentController.studentsList);
router.get("/register/:id?", StudentController.registerForm);
router.post(
  "/register/:id?",
  checkSchema(StudentValidator.studentSchema),
  StudentController.register
);
router.delete("/", StudentController.deleteStudent);
export default router;
