import "../css/cardinfo.css";

let CardInfo = ({ pokeName, img, pokedex, abilities, types, flipped }) => {
  return (
    <div className="card-cont h-5/6 md:h-3/4 flex flex-col justify-center items-center gap-3 overflow-y-auto">
      <div className="cards" onClick={flipped}>
        <div className="front z-10">
          <img src={img} alt="pokemon-img" />
        </div>
        <div className="back z-10 flex flex-col text-white text-center">
          <p>Name: {pokeName}</p>
          <p>N° Pokedex: {pokedex}</p>
          <p>Abilities: {abilities}</p>
          <p>Types: {types}</p>
        </div>
      </div>
      <div className="name rounded">
        <h1>{pokeName}</h1>
      </div>
    </div>
  );
};

export { CardInfo };
