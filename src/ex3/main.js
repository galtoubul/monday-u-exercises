import fs from "fs";
import { Command } from "commander";
import axios from "axios";

const tasksFilePath = "./tasks.json";
const ERR = -1;

init();
const program = new Command();

program.name("node main.js").usage("[options] command");
const appDescription = "TIME TO GRIND\nThe best cli todo app since 27/5/2022"
program.description(appDescription).version("1.0.0");

program.configureHelp();

program
  .command("add")
  .description("Adds a new task")
  .argument(
    "<string>",
    'Task\'s description or a pokemon id.\nFor comma separated pokemon ids please put quates around ("<pokemon id>, <pokemon id>[,<pokemon id>]")'
  )
  .action((task) => {
    addTask(task);
  });

program
  .command("get")
  .description("Returns all existing tasks")
  .action(() => {
    getTasks();
  });

program
  .command("delete")
  .description("Deletes a task by its index")
  .argument("<int>", "Task's index (starting at 0)")
  .action((index) => {
    deleteTask(index);
  });

program.parse();

async function addTask(task) {
  const data = JSON.parse(fs.readFileSync(tasksFilePath));
  task = /^(\d+\s*,\s*)*\s*\d+\s*$/.test(task) ? await getPokemon(task) : task;
  let successMsg = "New todo was added successfully";
  if (task !== ERR) {
    if (typeof task === "object") {
      data.tasks = data.tasks.concat(task);
      if (task.length > 1) {
        successMsg = `${task.length} new todos were added successfully`;
      }
    } else {
      data.tasks.push(task);
    }
    fs.writeFileSync(tasksFilePath, JSON.stringify(data));
    console.log(successMsg);
  }
}

function deleteTask(index) {
  const data = JSON.parse(fs.readFileSync(tasksFilePath));
  data.tasks.splice(index, 1);
  fs.writeFileSync(tasksFilePath, JSON.stringify(data));
  console.log("Todo was deleted successfully");
}

function getTasks() {
  const data = JSON.parse(fs.readFileSync(tasksFilePath));
  if (!data.tasks.length) {
    console.log("Done and Done");
  } else {
    console.log(data.tasks.join("\n"));
  }
}

// Create an empty tasks list if the file doesn't exists yet
function init() {
  const data = fs.readFileSync(tasksFilePath, { flag: "a+" });
  if (!data.length) {
    const content = JSON.stringify({ tasks: [] });
    fs.writeFileSync(tasksFilePath, content);
  }
}

async function getPokemon(pokemonIds) {
  pokemonIds = pokemonIds.replaceAll(" ", "").split(",");
  const endPoint = "https://pokeapi.co/api/v2/pokemon/";
  try {
    const promises = pokemonIds.map((pokemonId) =>
      axios.get(`${endPoint}${pokemonId}`)
    );
    const results = await Promise.allSettled(promises);
    return parsePokeApiResults(results);
  } catch (err) {
    console.error(`The todo wasn't added. An error occured: ${err}`);
    return ERR;
  }
}

function parsePokeApiResults(results) {
  const errorPokemonIds = [];
  const todos = [];
  for (let res of results) {
    if (res.status === "rejected") {
      const pokeIdInd = res.reason.request.path.lastIndexOf("/") + 1;
      errorPokemonIds.push(res.reason.request.path.slice(pokeIdInd));
    } else {
      todos.push(`Catch ${res.value.data.name}`);
    }
  }
  if (errorPokemonIds.length === 1) {
    todos.push(`Pokemon with ID ${errorPokemonIds[0]} was not found`);
  } else if (errorPokemonIds.length > 1) {
    todos.push(
      `Failed tp fetch the pokemons with these ids: ${errorPokemonIds.join(
        ", "
      )}`
    );
  }
  return todos;
}
