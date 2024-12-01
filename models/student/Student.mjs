import mongoose from "mongoose";
import config from "../../config/default.mjs";

const { Schema } = mongoose;
const studentSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name must be not more than 50 characters long"],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [18, "Age must be at least 18"],
    max: [120, "Age must be at most 120"],
    toInt: true,
  },
  averageScore: {
    type: Number,
    required: [true, "Average score is required"],
    min: [1, "Age must be at least 1"],
    max: [12, "Age must be at most 12"],
    toInt: true,
  },
});

studentSchema.statics.checkDatabaseExists = async () => {
  const databases = await mongoose.connection.listDatabases();
  return databases.databases.some((db) => db.name === config.databaseName);
};

studentSchema.static.checkCollectionExists = async function () {
  if (await this.checkDatabaseExists()) {
    const collections = await mongoose.connection.db
      .listCollections({ name: "users" })
      .toArray();
    return collections.length > 0;
  }
  return false;
};
const Student = mongoose.model("Student", studentSchema);
export default Student;
