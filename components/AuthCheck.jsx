import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

// component's children only shown to logged-in users
const AuthCheck = ({ fallback, children }) => {
  const { user, displayName } = useContext(UserContext);

  // if the user is logged in, show children components
  if (user?.uid && displayName) {
    return children;
  }

  // if a fallback prop is provided, show fallback
  if (fallback) {
    return fallback;
  }

  // show generic "you need to login" link
  return (
    <Link href="/sign-in">
      <a>You must be signed in to view this content</a>
    </Link>
  );
};

export default AuthCheck;
