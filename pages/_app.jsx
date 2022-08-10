// import Navbar from "../components/Navbar/Navbar";
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      {/* <Navbar /> */}
      <Component {...pageProps} />
    </UserContext.Provider>
  );
};

export default MyApp;
