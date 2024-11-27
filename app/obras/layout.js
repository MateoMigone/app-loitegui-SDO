import DrawerMenu from "../components/ui/DrawerMenu";

export default function Layout({ children }) {
  return (
    <section>
      <header>
        <DrawerMenu />
      </header>
      {children}
    </section>
  );
}
