import { useState, useEffect } from "react";
import { CardInfo } from "./CardInfo";

const Cards = () => {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonEvol, setPokemonEvol] = useState([]);

  useEffect(() => {
    // Llama a getEvolutions cuando pokemonId cambia
    getEvolutions(pokemonId);
  }, [pokemonId]);

  const getEvolutions = async (id) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/evolution-chain/${id}/`
      );
      const data = await response.json();

      const pokemonEvoArray = [];

      // Obtiene la evolución inicial
      const pokemonBaby = data.chain.species.name;
      const pokemonBabyImg = await getPokemonImgs(pokemonBaby);
      pokemonEvoArray.push([pokemonBaby, pokemonBabyImg]);

      // Función recursiva para obtener todas las evoluciones
      const getEvolutionsRecursive = async (chain) => {
        if (!chain || !chain.evolves_to) return;

        for (let i = 0; i < chain.evolves_to.length; i++) {
          const evolution = chain.evolves_to[i];
          const eeveeEvo = evolution.species.name;
          const eeveeEvoImg = await getPokemonImgs(eeveeEvo);
          pokemonEvoArray.push([eeveeEvo, eeveeEvoImg]);

          // Llama a la función recursiva para obtener evoluciones del siguiente nivel
          await getEvolutionsRecursive(evolution);
        }
      };

      // Empieza la recursión con la cadena inicial
      await getEvolutionsRecursive(data.chain);

      // Actualiza el estado con el array de evoluciones
      setPokemonEvol(pokemonEvoArray);
    } catch (error) {
      console.error("Error al obtener las evoluciones:", error);
    }
  };

  const getPokemonImgs = async (name) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}/`
      );
      const data = await response.json();
      return data.sprites.other["official-artwork"].front_default;
    } catch (error) {
      console.error("Error al obtener la imagen del Pokémon:", error);
      return ""; // Devuelve una cadena vacía en caso de error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 w-full h-screen">
      <div className="flex gap-5">
        <button
          onClick={() => setPokemonId((prevId) => Math.max(prevId - 1, 1))} // Evita que el ID sea menor que 1
          className="cursor-pointer bg-blue-300 w-12 py-1 px-2 rounded hover:scale-110 duration-300"
        >
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button
          onClick={() => setPokemonId((prevId) => prevId + 1)}
          className="cursor-pointer bg-blue-300 w-12 py-1 px-2 rounded hover:scale-110 duration-300"
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <div className="flex gap-5">
        {/* <h1 className="text-3xl">{pokemonId}</h1> */}
        <div className="flex gap-5">
          {pokemonEvol.map((pokemon) => (
            <CardInfo key={pokemon[0]} name={pokemon[0]} img={pokemon[1]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Cards };
