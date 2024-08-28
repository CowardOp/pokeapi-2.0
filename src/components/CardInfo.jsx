import "../css/cardinfo.css";

let CardInfo = ({ name, img }) => {
  return (
    <div className="card-cont flex flex-col gap-3 bh-black justify-center items-center">
      <div className="card">
        <img className="w-full z-[999] " src={img} alt="pokemon-img" />
      </div>
      <div className="p-2 rounded bg-[#4CCD99]">
        <p className="">{name}</p>
      </div>
    </div>
  );
};

export { CardInfo };
