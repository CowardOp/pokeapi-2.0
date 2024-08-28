import logoPrincipal from "../img/logo-negro.png";

const Header = () => {
  return (
    <>
      <header className="">
        <nav className="absolute w-1/6 py-1 ps-3">
          <img src={logoPrincipal} alt="logo-principal" className="w-[90px]" />
        </nav>
      </header>
    </>
  );
};

export default Header;
