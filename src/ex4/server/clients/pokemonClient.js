import axios from "axios";

async function getPokemonName(pokemonId) {
  const endPoint = "https://pokeapi.co/api/v2/pokemon-form/";
  return parsePokeApiRes(await axios.get(`${endPoint}${pokemonId}`));
}

function parsePokeApiRes(res) {
  if (res?.status === "rejected") {
    throw new Error("The request was rejected");
  } else {
    return res?.data?.name;
  }
}

export { getPokemonName };
