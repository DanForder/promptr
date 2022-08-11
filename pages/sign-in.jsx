import { useRouter } from "next/router";
import { useState } from "react";
import EnterForm from "../components/EnterForm";
import Layout from "../components/Layout";
import { signInUser } from "../lib/firebase";

const inputArray = [
  { name: "Email", type: "email" },
  { name: "Password", type: "Password" },
];

const SignIn = () => {
  const router = useRouter();

  const [error, setError] = useState("");

  const onSubmit = async (form) => {
    const result = await signInUser(form["Email"], form["Password"]);

    if (result.isSuccess) return router.push("/");

    setError(result.error);
  };

  return (
    <Layout>
      <EnterForm
        onSubmit={onSubmit}
        inputArray={inputArray}
        altLink="/sign-up"
        altLinkText="Sign up"
        heading="Welcome Back"
        submitText="Sign in"
        error={error}
      />
    </Layout>
  );
};

export default SignIn;
