import StudentsDBService from "../models/student/StudentsDBService.mjs";
import { validationResult } from "express-validator";

class StudentController {
  static async studentsList(req, res) {
    try {
      const filters = {};
      for (const key in req.query) {
        if (req.query[key]) filters[key] = req.query[key];
      }
      const dataList = await StudentsDBService.getList(filters);
      res.render("students", {
        title: "Students List",
        students: dataList,
      });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }
  static async registerForm(req, res) {
    try {
      const id = req.params.id;
      let student = {};
      if (id) {
        //отримати об"єкт за id
        student = await StudentsDBService.getById(id);
      }

      //відредерити сторінку з формою
      res.render("register", {
        errors: [],
        title: "Students List",
        data: student,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  static async register(req, res) {
    // Якщо валідація пройшла успішно, виконуємо логіку реєстрації
    const errors = validationResult(req);
    const data = req.body;

    if (!errors.isEmpty()) {
      if (req.params.id) data.id = req.params.id;
      return res.status(400).render("register", {
        errors: errors.array(),
        data,
      });
    }
    try {
      const { name, age, averageScore } = req.body;
      const dataObj = { name, age, averageScore };
      console.log("dataObj:", dataObj);
      if (req.params.id) {
        // Оновлюємо дані про студента в базі даних
        await StudentsDBService.update(req.params.id, dataObj);
      } else {
        // Додаємо користувача в базу даних
        await StudentsDBService.create(dataObj);
      }
      res.redirect("/students");
    } catch (error) {
      res.status(400).json({ errors });
    }
  }

  static async deleteStudent(req, res) {
    try {
      await StudentsDBService.deleteById(req.body.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting student:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to delete student" });
    }
  }
}
export default StudentController;
