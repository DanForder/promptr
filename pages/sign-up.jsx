import { useRouter } from "next/router";
import { useState } from "react";
import EnterForm from "../components/EnterForm";
import Layout from "../components/Layout";
import { registerUser } from "../lib/firebase";

const inputArray = [
  { name: "Display Name", type: "text" },
  { name: "Email", type: "email" },
  { name: "Password", type: "Password" },
];

const SignUp = () => {
  const router = useRouter();

  const [error, setError] = useState("");

  const onSubmit = async (form) => {
    const res = await registerUser(
      form["Display Name"],
      form["Email"],
      form["Password"]
    );

    if (res) {
      router.push("/");
    }

    setError(result.error);
  };

  return (
    <Layout>
      <EnterForm
        onSubmit={onSubmit}
        inputArray={inputArray}
        altLink="/sign-in"
        altLinkText="Sign in"
        heading="Create Account"
        submitText="Sign up"
        error={error}
      />
    </Layout>
  );
};

export default SignUp;
