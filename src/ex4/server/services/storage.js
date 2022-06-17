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

  async updateTask(id, updatedKeysValues) {
    return Item.update(updatedKeysValues, { where: { id } });
  }

  async getTasksLeftNum() {
    return await Item.count({ where: { checked: false } });
  }
}

const storage = new StorageService();
export { storage };
