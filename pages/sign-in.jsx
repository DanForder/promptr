import { useRouter } from "next/router";
import EnterForm from "../components/EnterForm";
import { signInUser } from "../lib/firebase";

const SignIn = () => {
  const router = useRouter();

  const inputArray = [
    { name: "Email", type: "email" },
    { name: "Password", type: "Password" },
  ];

  const onSubmit = async (form) => {
    const res = await signInUser(form["Email"], form["Password"]);

    if (res?.user?.uid) {
      router.push("/");
    }
  };

  return (
    <EnterForm
      onSubmit={onSubmit}
      inputArray={inputArray}
      altLink="/sign-up"
      altLinkText="Sign up"
      heading="Welcome Back"
      submitText="Sign in"
    />
  );
};

export default SignIn;
