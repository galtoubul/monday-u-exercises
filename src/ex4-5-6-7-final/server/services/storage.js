import Item from "../db/models/item.js";
import { sequelize } from "../db/models/index.js";

class StorageService {
  async getTasks() {
    return await Item.findAll({
      attributes: [
        "id",
        "itemName",
        "checked",
        [
          sequelize.fn(
            "DATE_FORMAT",
            sequelize.col("doneTime"),
            "%Y-%m-%d %H:%i:%s"
          ),
          "doneTime",
        ],
      ],
      raw: true,
    });
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
    return new Date(now);
  }

  async updateTask(id, updatedKeysValues) {
    const doneTime = updatedKeysValues?.checked ? this.getCurrTime() : null;
    updatedKeysValues = { ...updatedKeysValues, doneTime };
    const updatedTasksNum = await Item.update(updatedKeysValues, {
      where: { id },
    });
    updatedKeysValues = {
      ...updatedKeysValues,
      doneTime: this.stringifyDate(doneTime),
    };
    return { updatedTasksNum, updatedKeysValues };
  }

  stringifyDate(date) {
    // Convert from YYYY-MM-DDTHH:MM:SS.SSSZ to YYYY-MM-DD HH:MM:SS
    return date ? date.toISOString().slice(0, 19).replace("T", " ") : null;
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
