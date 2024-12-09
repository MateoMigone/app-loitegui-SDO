import Header from "../components/ui/Header";

export default function Layout({ children }) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
