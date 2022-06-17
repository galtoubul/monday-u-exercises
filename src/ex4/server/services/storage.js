import Item from "../db/models/item.js";

class StorageService {
  async getTasks() {
    return await Item.findAll({ raw: true });
  }

  async addTask(itemName) {
    const addedTask = await Item.create({ itemName }, { raw: true });
    return addedTask.toJSON().id;
  }

  async getTasksLeftNum() {
    return await Item.count({ where: { checked: false } });
  }
  //   getPlayers = () => Player.findAll();
  //   getPlayer = async (player_id) => {
  //     return await Player.findOne({ where: { player_id } });
  //     //TODO 1: Use Player sequelize model to retrieve the specific player
  //   };
  //   createPlayer = async (player) => {
  //     //TODO 2: Use Player sequelize model to create a player
  //     await Player.create(player);
  //   };
  //   createSalary = async (salary) => {
  //     await Salary.create(salary);
  //   };
  //   getSalary = async (salary_id) => {
  //     // return await Salary.findOne({ where: { id: salary_id } });
  //     return await Salary.findByPk(salary_id, { include: Player });
  //     //TODO 5: Use Salary sequelize model to get salary
  //   };
}

const storage = new StorageService();
export { storage };
