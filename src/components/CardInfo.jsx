import React, { useState } from "react";
import "../css/cardinfo.css";
import clickSound from "../audio/Click.mp3";

const CardInfo = ({
  pokeName,
  img,
  pokedex,
  abilities,
  types,
  flipped,
  height,
  weight,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    if (flipped) flipped();

    const audio = new Audio(clickSound);
    audio.volume = 0.3;
    audio.playbackRate = 1.5;
    audio.play();
  };

  return (
    <div className="card-cont h-5/6 md:h-3/4 flex flex-col justify-center items-center gap-3 overflow-y-auto">
      <div className={`cards ${isFlipped ? "flipped" : ""}`}>
        <div className="front z-10">
          <img src={img} alt="pokemon-img" className="duration-300" />
          <button
            onClick={handleClick}
            className="flip flex justify-center items-center w-[40px] h-[40px] absolute flip z-[999] bottom-3 right-3 text-3xl bg-[#FFAD60] rounded-full active:scale-[1.1]"
          >
            <i className="fa-solid fa-rotate-right"></i>
          </button>
        </div>
        <div className="w-[80%] back z-10 flex flex-col text-white text-center">
          <p>Nombre: {pokeName}</p>
          <p>N° Pokedex: {pokedex}</p>
          <p>Habilidades: {abilities}</p>
          <p>Tipos: {types}</p>
          <p>Altura: {height} m</p>
          <p>Peso: {weight} Kg</p>

          <button
            onClick={handleClick}
            className="flip flex justify-center items-center w-[40px] h-[40px] absolute flip z-[999] bottom-3 left-3 text-3xl bg-[#FFAD60] rounded-full active:scale-[1.1]"
          >
            <i className="fa-solid fa-rotate-right"></i>
          </button>
        </div>
      </div>
      <div className="name rounded">
        <h1>{pokeName}</h1>
      </div>
    </div>
  );
};

export { CardInfo };
