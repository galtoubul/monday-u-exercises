import Image from "ascii-art-image";
import gradient from "gradient-string";
import figlet from "figlet";
import axios from "axios";
import chalk from "chalk";

const ERR = -1;

export { getPokemon, printPokemons, ERR };

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
  let pokemonsPhotos = {};
  for (let res of results) {
    if (res?.status === "rejected") {
      const pokeIdInd = res?.reason?.request?.path.lastIndexOf("/") + 1;
      errorPokemonIds.push(res?.reason?.request?.path.slice(pokeIdInd));
    } else {
      pokemonsPhotos[res?.value?.data?.name] =
        res?.value?.data?.sprites?.front_default;
      todos.push(`Catch ${res?.value?.data?.name}`);
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
  return { todos, pokemonsPhotos };
}

function printPokemon(pokemonName, pokemonPhoto) {
  return new Promise((resolve, reject) => {
    new Image({
      filepath: pokemonPhoto,
      alphabet: "variant4",
    }).write(function (err, rendered) {
      figlet(pokemonName, (err, data) => {
        console.log(gradient.pastel.multiline(data) + "\n");
        console.log(rendered);
        resolve();
      });
    });
  });
}

async function printPokemons(pokemonsPhotos) {
  const msg =
    "New pokemon" +
    (Object.keys(pokemonsPhotos).length > 1 ? "s" : "") +
    " to catch:";
  console.log(chalk.bgCyan(msg));

  const promises = Object.keys(pokemonsPhotos).map((pokemonName) =>
    printPokemon(pokemonName, pokemonsPhotos[pokemonName])
  );
  await Promise.all(promises);
}
