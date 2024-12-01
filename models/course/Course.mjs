import mongoose from "mongoose";
const { Schema } = mongoose;

const seminarSchema = new Schema({
  seminar: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId, //зберіг id
    ref: "Student",
    required: true,
  },
});

// Створення основної схеми для курсу
const courseSchema = new Schema({
  course: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId, //зберіг id
      ref: "Student",
      required: true,
    },
  ],
  seminars: [seminarSchema],
});
const Course = mongoose.model("Course", courseSchema);
export default Course;
