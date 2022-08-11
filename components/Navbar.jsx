import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { signOutUser } from "../lib/firebase";
import styles from "../styles/navbar.module.scss";

const Navbar = ({}) => {
  const { displayName } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul className={styles.list}>
        <li>
          <Link href="/">
            <a>home</a>
          </Link>
        </li>

        {displayName && (
          <li>
            <Link href="/sign-in">
              <a onClick={signOutUser} className="btn-blue">
                sign out
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
