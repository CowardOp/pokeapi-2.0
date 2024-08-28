import { useState, useEffect } from "react";
import { CardInfo } from "./CardInfo";
import { Botones } from "./Botones";
import "../css/card.css";

const Cards = () => {
  const [pokemonId, setPokemonId] = useState(1);
  const [pokemonEvol, setPokemonEvol] = useState([]);

  useEffect(() => {
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
      const pokemonBaby = await getPokemonData(data.chain.species.name);
      pokemonEvoArray.push(pokemonBaby);

      // Función recursiva para obtener todas las evoluciones
      const getEvolutionsRecursive = async (chain) => {
        if (!chain || !chain.evolves_to) return;

        for (let i = 0; i < chain.evolves_to.length; i++) {
          const evolution = chain.evolves_to[i];
          const evolutionData = await getPokemonData(evolution.species.name);
          pokemonEvoArray.push(evolutionData);

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

  const getPokemonData = async (name) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name}/`
      );
      const data = await response.json();
      // console.log(data);
      return {
        id: data.id,
        name: data.name,
        img: data.sprites.other["official-artwork"].front_default,
        abil: data.abilities
          .map((abilInfo) => abilInfo.ability.name)
          .join(", "),
        types: data.types.map((abilInfo) => abilInfo.type.name).join(", "),
      };
    } catch (error) {
      console.error(`Error al obtener datos del Pokémon ${name}:`, error);
      return null; // Devuelve null en caso de error
    }
  };

  let prevId = () => {
    pokemonId === 1 ? setPokemonId(1) : setPokemonId(pokemonId - 1);
  };

  let nextId = () => {
    setPokemonId(pokemonId + 1);
  };

  return (
    <div className="flex  justify-center gap-3 w-full h-screen py-10 bg-[#C3FF93] overflow-hidden">
      <div className="flex gap-5">
        <Botones
          clase={
            "fixed h-3/4 cursor-pointer bg-blue-300 py-2 px-3.5 rounded text-2xl left-0 top-[15%]"
          }
          icon={<i className="fa-solid fa-arrow-left"></i>}
          handleClick={prevId}
        />
      </div>
      <div className="w-full flex flex-wrap overflow-y-auto gap-10 items-center justify-center overflow-y-auto">
        {pokemonEvol.map((pokemon) => (
          <CardInfo
            key={pokemon.id}
            pokedex={pokemon.id}
            img={pokemon.img}
            abilities={pokemon.abil}
            types={pokemon.types}
            pokeName={pokemon.name}
          />
        ))}
      </div>
      <div className="flex gap-5">
        <Botones
          clase={
            "fixed h-3/4 cursor-pointer bg-blue-300 py-2 px-3.5 rounded text-2xl right-0 top-[15%]"
          }
          icon={<i className="fa-solid fa-arrow-right"></i>}
          handleClick={nextId}
        />
      </div>
    </div>
  );
};

export { Cards };
