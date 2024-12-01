import { body } from "express-validator";

class StudentValidator {
  static studentValidationRules = [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("age").not().isEmpty().withMessage("Age is required"),
    body("averageScore")
      .isLength({ min: 1 })
      .withMessage("Average score must be at least 1 character long"),
  ];
  static studentSchema = {
    name: {
      notEmpty: {
        errorMessage: "Name is required",
      },
      isLength: {
        options: { min: 3 },
        errorMessage: "Username must be at least 3 characters long",
      },
      trim: true, // Видаляє пробіли на початку і в кінці
      escape: true, // Екранує HTML символи
    },
    age: {
      isInt: {
        options: { min: 18, max: 120 },
        errorMessage: "Age must be between 18 and 120",
      },
      toInt: true,
    },
    averageScore: {
      notEmpty: {
        errorMessage: "Average score is required",
      },
      isLength: {
        //   isFloat: {
        //     options: {
        //       min: 1,
        //       max: 12,
        //     },
        errorMessage: "Average score must be at least 1 characters long",
      },
      //   toFloat: true,
      // },
    },
  };
}
export default StudentValidator;
