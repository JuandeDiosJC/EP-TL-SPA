import "./globals.css";
import ClientNav from "../components/ClientNav";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientNav />
        {children}
      </body>
    </html>
  );
}