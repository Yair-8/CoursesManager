import Student from "../student/Student.mjs";
import MongooseCRUDManager from "../MongooseCRUDManager.mjs";

class StudentsDBService extends MongooseCRUDManager {
  async getList({ filters }) {
    try {
      const res = await super.getList(filters);
      return res;
    } catch (error) {
      return [];
    }
  }
}
export default new StudentsDBService(Student);
