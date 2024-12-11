import Header from "@/components/Header";
import { UserProvider } from "@/context/userContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Header />
      <Component {...pageProps} />
    </UserProvider>
  );
  // return <Component {...pageProps} />;
}
