import Header from "../components/ui/Header";
import { ObraContextProvider } from "../context/ObraContext";

export default function Layout({ children }) {
  return (
    <section>
      <Header />
      <ObraContextProvider>{children}</ObraContextProvider>
    </section>
  );
}
