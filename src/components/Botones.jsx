let Botones = ({ icon, handleClick, clase }) => {
  return (
    <div className="flex justify-center">
      <button onClick={handleClick} className={clase}>
        {icon}
      </button>
    </div>
  );
};

export { Botones };
