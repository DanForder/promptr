import { useRouter } from "next/router";
import EnterForm from "../components/EnterForm";
import { registerUser } from "../lib/firebase";

const SignUp = () => {
  const router = useRouter();

  const inputArray = [
    { name: "Display Name", type: "text" },
    { name: "Email", type: "email" },
    { name: "Password", type: "Password" },
  ];

  const onSubmit = async (form) => {
    const res = await registerUser(
      form["Display Name"],
      form["Email"],
      form["Password"]
    );

    if (res) {
      router.push("/");
    }
  };

  return (
    <EnterForm
      onSubmit={onSubmit}
      inputArray={inputArray}
      altLink="/sign-in"
      altLinkText="Sign in"
      heading="Create Account"
      submitText="Sign up"
    />
  );
};

export default SignUp;
