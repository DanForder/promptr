import AuthCheck from "./AuthCheck";
import Navbar from "./Navbar";
import styles from "../styles/layout.module.scss";

const Layout = ({ showNavbar = false, requiresAuth = false, children }) => {
  const layoutJsx = (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );

  // if the page should be behind authentication
  if (requiresAuth)
    return (
      <div className={styles.outerWrapper}>
        <div className={styles.wrapper}>
          <AuthCheck>{layoutJsx}</AuthCheck>
        </div>
      </div>
    );

  // no authentication is required
  return (
    <div className={styles.outerWrapper}>
      <div className={styles.wrapper}>{layoutJsx}</div>
    </div>
  );
};

export default Layout;
