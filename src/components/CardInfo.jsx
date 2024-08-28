import "../css/cardinfo.css";

let CardInfo = ({ name, img, pokedex, abilities, types }) => {
  return (
    <div className="card-cont flex flex-col gap-3 bh-black justify-center items-center">
      <div className="cards flex">
        <div className="card-front">
          <img className="w-full z-[999] " src={img} alt="pokemon-img" />
        </div>

        <div className="card-back flex-col text-center">
          <p className="text-xl z-[999] text-white">N° Pokedex: {pokedex}</p>
          <p className="text-xl z-[999] text-white">Abilities: {abilities}</p>
          <p className="text-xl z-[999] text-white">Types: {types}</p>
        </div>
      </div>
      <div className="name-cont p-2 rounded bg-[#4CCD99]">
        <p className="name text-xl ">{name}</p>
      </div>
    </div>
  );
};

export { CardInfo };
