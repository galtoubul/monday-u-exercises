import Item from "../db/models/item.js";

class StorageService {
  async getTasks() {
    return await Item.findAll({ raw: true });
  }

  async addTask(itemName) {
    const addedTask = await Item.create({ itemName }, { raw: true });
    return addedTask.toJSON().id;
  }

  async deleteTask(id) {
    return await Item.destroy({ where: { id } });
  }

  async clearAll() {
    return await Item.destroy({ truncate: true });
  }

  getCurrTime() {
    let now = new Date().getTime();
    now += 3 * 60 * 60 * 1000; // add 3 hours to match to Israel Time Zone
    return new Date(now).toISOString().slice(0, 19).replace("T", " ");
  }

  async updateTask(id, updatedKeysValues) {
    if (updatedKeysValues?.checked) {
      const doneTime = this.getCurrTime();
      updatedKeysValues = { ...updatedKeysValues, doneTime };
    }
    const updatedTasksNum = await Item.update(updatedKeysValues, {
      where: { id },
    });
    return { updatedTasksNum, updatedKeysValues };
  }

  async updateDoneTime() {
    Item.update();
  }

  async getTasksLeftNum() {
    return await Item.count({ where: { checked: false } });
  }
}

const storage = new StorageService();
export { storage };
