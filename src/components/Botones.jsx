let Botones = ({ icon, handleClick }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={handleClick}
        className="cursor-pointer bg-blue-300 py-2 px-3.5 rounded text-2xl"
      >
        {icon}
      </button>
    </div>
  );
};

export { Botones };
