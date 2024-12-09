import { Roboto } from "next/font/google";
import "./globals.css";
import { AuthContextProvider, useAuthContext } from "./context/AuthContext";
import DrawerMenu from "./components/ui/DrawerMenu";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "App Loitegüi",
  description: "Gestión de obras",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
