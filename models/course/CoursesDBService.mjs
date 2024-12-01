import Course from "./Course.mjs";
import MongooseCRUDManager from "../MongooseCRUDManager.mjs";

class CourseDBService extends MongooseCRUDManager {
  async getList(filters) {
    try {
      const res = await super.getList(filters, { age: 0, averageScore: 0 }, [
        "students",
        {
          fieldForPopulation: "seminars.student",
          requiredFieldsFromTargetObject: "name",
        },
      ]);
      return res;
    } catch (error) {
      return [];
    }
  }
}
export default new CourseDBService(Course);
