import CoursesDBService from "../models/course/CoursesDBService.mjs";
import StudentsDBService from "../models/student/StudentsDBService.mjs";
import { validationResult } from "express-validator";

class CourseController {
  static async getList(req, res) {
    try {
      const filters = {};
      for (const key in req.query) {
        if (req.query[key]) filters[key] = req.query[key];
      }
      const studentsList = await StudentsDBService.getList({});
      const dataList = await CoursesDBService.getList(filters);
      dataList.forEach((item, ind, arr) => {
        arr[ind].students = item.students
          .map((student) => student.name)
          .join(",");
      });
      res.render("courses", {
        pageTitle: "Course title",
        headerTitle: "Courses list",
        courses: dataList,
        students: studentsList,
        addNewRoute: "/courses/register",
        editLinkBase: "/courses/register",
        deleteCourseRoute: "/courses",
        addSeminarBase: "/courses/seminars",
        deleteSeminarRoute: "/courses/seminars",
      });
    } catch (error) {
      res.status(500).json({ error: err.message });
    }
  }
  static async registerForm(req, res) {
    try {
      const id = req.params.id;
      let dataItem = {};
      if (id) {
        dataItem = await CoursesDBService.getById(id);
      }
      const studentsList = await StudentsDBService.getList({});
      //відредерити сторінку з формою
      res.render("general/generalEditForm", {
        pageTitle: "Course form",
        headerTitle: "Register form",
        fields: [
          { name: "course", type: "text", required: true, label: "Course" },
          { name: "duration", type: "number", label: "Duration" },
          {
            name: "students",
            type: "checkbox",
            required: true,
            label: "Students",
            multiple: true,
            options: studentsList,
          },
        ],
        initialValues: dataItem,
        errors: [],
        submitUrl: "/courses/register" + (id ? `/${id}` : ""),
        redirectUrl: "/courses",
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  static async register(req, res) {
    // Якщо валідація пройшла успішно, виконуємо логіку реєстрації
    const errors = validationResult(req);
    const data = req.body;
    const studentsList = await StudentsDBService.getList({});
    if (!errors.isEmpty()) {
      if (req.params.id) data.id = req.params.id;
      return res.status(400).render("general/generalEditForm", {
        pageTitle: "Course form",
        headerTitle: "Register form",
        fields: [
          { name: "course", type: "text", required: true, label: "Course" },
          { name: "duration", type: "number", label: "Duration" },
          {
            name: "students",
            type: "checkbox",
            required: true,
            label: "Students",
            multiple: true,
            options: studentsList,
          },
        ],
        initialValues: data,
        errors: errors.array(),
        submitUrl: "/courses/register",
        redirectUrl: "/courses",
      });
    }

    try {
      const dataObj = req.body;
      // const { title } = req.body
      // const dataObj = { title }
      if (req.params.id) {
        // Оновлюємо дані про користувача в базі даних
        await CoursesDBService.update(req.params.id, dataObj);
      } else {
        // Додаємо користувача в базу даних
        await CoursesDBService.create(dataObj);
      }
      res.redirect("/courses");
    } catch (error) {
      res.status(500).render("general/generalEditForm", {
        pageTitle: "Type form?",
        headerTitle: "Register form",
        fields: [
          { name: "course", type: "text", required: true, label: "Course" },
          { name: "duration", type: "number", label: "Duration" },
          {
            name: "students",
            type: "checkbox",
            required: true,
            label: "Students",
            multiple: true,
            options: studentsList,
          },
        ],
        initialValues: data,
        errors: [{ msg: err.message }],
        submitUrl: "/students/register",
        redirectUrl: "/students",
      });
    }
  }
  static async delete(req, res) {
    try {
      await CoursesDBService.deleteById(req.body.id);
      res.json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete user" });
    }
  }

  //---- comments----------
  // Метод для створення семінару

  static async createSeminar(req, res) {
    try {
      const course = await CoursesDBService.getById(req.params.courseId);
      if (!course) {
        throw new Error("Course not found");
      }
      const { seminar, duration, student } = req.body;
      const newSeminar = { seminar, duration, student };
      course.seminars.push(newSeminar);
      await course.save();
      // res.json({ success: true })
      res.redirect("/courses");
    } catch (error) {
      throw new Error("Error creating comment: " + error.message);
    }
  }

  // Метод для видалення коментаря
  static async deleteSeminar(req, res) {
    try {
      const course = await CoursesDBService.getById(req.params.courseId);
      if (!course) {
        throw new Error("Course not found");
      }
      course.students = course.students.filter(
        (student) => student._id.toString() !== req.body.id
      );
      await course.save();
      // res.json({ success: true })
      res.redirect("/courses");
    } catch (error) {
      throw new Error("Error deleting comment: " + error.message);
    }
  }
}
export default CourseController;
