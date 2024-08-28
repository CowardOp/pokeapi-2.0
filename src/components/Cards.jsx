import { useState, useEffect, useRef } from "react";
import { CardInfo } from "./CardInfo";
import { Botones } from "./Botones";
import "../css/card.css";
import clickSound from "../audio/Click.mp3";

const usePokemonEvolutions = (pokemonId, imageType) => {
  const [pokemonEvol, setPokemonEvol] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPokemonData = async (name, imgType) => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}/`
        );
        const data = await response.json();

        console.log(data);

        return {
          id: data.id,
          name: data.name,
          img: data.sprites.other["official-artwork"][imgType],
          abil: data.abilities
            .map((abilInfo) => abilInfo.ability.name)
            .join(", "),
          types: data.types.map((typeInfo) => typeInfo.type.name).join(", "),
          pHeight: data.height,
          pWeight: data.weight,
        };
      } catch (error) {
        console.error(`Error al obtener datos del Pokémon ${name}:`, error);
        return null;
      }
    };

    const getEvolutions = async (id) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/evolution-chain/${id}/`
        );
        const data = await response.json();

        const pokemonEvoArray = [];
        const pokemonBaby = await getPokemonData(
          data.chain.species.name,
          imageType
        );
        pokemonEvoArray.push(pokemonBaby);

        const getEvolutionsRecursive = async (chain) => {
          if (!chain || !chain.evolves_to) return;

          for (const evolution of chain.evolves_to) {
            const evolutionData = await getPokemonData(
              evolution.species.name,
              imageType
            );
            pokemonEvoArray.push(evolutionData);
            await getEvolutionsRecursive(evolution);
          }
        };

        await getEvolutionsRecursive(data.chain);
        setPokemonEvol(pokemonEvoArray);
      } catch (error) {
        console.error("Error al obtener las evoluciones:", error);
        setError("No se pudo cargar la información.");
      } finally {
        setLoading(false);
      }
    };

    getEvolutions(pokemonId);
  }, [pokemonId, imageType]);

  return { pokemonEvol, loading, error };
};

const Cards = () => {
  const [pokemonId, setPokemonId] = useState(1);
  const [imageType, setImageType] = useState("front_default");
  const { pokemonEvol, loading, error } = usePokemonEvolutions(
    pokemonId,
    imageType
  );

  const audioRef = useRef(new Audio(clickSound));

  const playSound = () => {
    audioRef.current.volume = 0.3;
    audioRef.current.play();
  };

  const prevId = () => {
    setPokemonId((prevId) => (prevId === 1 ? 1 : prevId - 1));
    playSound();
  };

  const nextId = () => {
    setPokemonId((prevId) => prevId + 1);
    playSound();
  };

  const toggleImageType = () => {
    setImageType((prevType) =>
      prevType === "front_default" ? "front_shiny" : "front_default"
    );
    playSound();
  };

  return (
    <div className="flex justify-center gap-3 w-full h-screen py-10 bg-[#C3FF93] overflow-hidden">
      <div className="flex gap-5">
        <Botones
          clase="fixed h-3/4 cursor-pointer bg-blue-300 py-2 px-3.5 rounded text-2xl left-0 top-[15%] active:translate-x-[4px]"
          icon={<i className="fa-solid fa-arrow-left md:text-4xl"></i>}
          handleClick={prevId}
        />
      </div>
      <div className="w-full flex flex-wrap overflow-y-auto gap-10 items-center justify-center overflow-y-auto">
        {loading && <p>Cargando...</p>}
        {error && <p>{error}</p>}
        {!loading &&
          !error &&
          pokemonEvol.map((pokemon) => (
            <CardInfo
              key={pokemon.id}
              pokedex={pokemon.id}
              img={pokemon.img}
              abilities={pokemon.abil}
              types={pokemon.types}
              pokeName={pokemon.name}
              weight={pokemon.pWeight}
              height={pokemon.pHeight}
            />
          ))}
      </div>
      <div className="flex gap-5">
        <Botones
          clase="fixed h-3/4 cursor-pointer bg-blue-300 py-2 px-3.5 rounded text-2xl right-0 top-[15%] active:translate-x-[-4px]"
          icon={<i className="fa-solid fa-arrow-right md:text-4xl"></i>}
          handleClick={nextId}
        />
        <Botones
          clase="boton fixed top-10 md:top-20 left-[40%] md:left-[47%] bg-[#FFDA76] px-5 py-1 rounded md:text-3xl"
          icon={"Shiny"}
          handleClick={toggleImageType}
        />
      </div>
    </div>
  );
};

export { Cards };
