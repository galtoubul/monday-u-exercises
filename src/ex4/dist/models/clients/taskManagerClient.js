class TaskManagerClient {
  constructor() {
    this.endPoint = "http://localhost:8000/todo";
  }

  async getTasks() {
    try {
      const res = await axios.get(this.endPoint);
      return res.data;
    } catch (err) {
      console.error(`An error occured: ${err}`);
      return [];
    }
  }

  async addTask(text) {
    const data = { text };
    try {
      const res = await axios.post(this.endPoint, { data });
      return res.data;
    } catch (err) {
      console.error(`An error occured: ${err}`);
    }
  }

  async deleteTask(taskId) {
    try {
      const res = await axios.delete(`${this.endPoint}/${taskId}`);
      return res.data;
    } catch (err) {
      console.error(`An error occured: ${err}`);
    }
  }

  async clearAll() {
    try {
      const res = await axios.delete(`${this.endPoint}/all`);
      return res.data;
    } catch (err) {
      console.error(`An error occured: ${err}`);
    }
  }

  async checkUncheckTask(taskId, newCheckedStatus) {
    try {
      const data = { checked: newCheckedStatus };
      const res = await axios.patch(`${this.endPoint}/${taskId}`, { data });
      return res.data;
    } catch (err) {
      console.error(`An error occured: ${err}`);
    }
  }
}
