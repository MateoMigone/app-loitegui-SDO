import DrawerMenu from "./DrawerMenu";

const Header = () => {
  return (
    <header className="bg-main-brown px-5 py-2 flex gap-5 items-center">
      <DrawerMenu />
      <h1 className="text-white text-[25px] pb-0.5">APP LOITEGUI</h1>
    </header>
  );
};

export default Header;
