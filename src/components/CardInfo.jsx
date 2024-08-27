let CardInfo = ({ name, img }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-red-500 w-[200px] h-[300px]">
        <div className="absolute w-[50px] h-[50px] bg-blue-400 rounded-[50%]"></div>
        <p className="">{name}</p>
        <img className="z-10" src={img} alt="pokemon-img" />
      </div>
    </>
  );
};

export { CardInfo };
