// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)
class ItemClient {
  constructor() {
    this.endPoint = "http://localhost:8000/todo/";
  }

  async getTasks() {
    try {
      const res = await axios.get(this.endPoint);
      return res.data.tasks;
    } catch (err) {
      console.error(`An error occured: ${err}`);
      return [];
    }
  }

  async addTask(task) {
    return;
  }

  async deleteTask(taskId) {
    try {
      await axios.delete(`${this.endPoint}\\${taskId}`);
    } catch (err) {
      console.error(`An error occured: ${err}`);
    }
  }
}
