import { useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/context";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import styles from "../styles/enter.module.scss";

const SignUp = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Create Account</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          aria-label="Enter Username"
          placeholder="Username"
        />
        <input
          className={styles.input}
          type="email"
          aria-label="Enter Email Address"
          placeholder="Email"
        />
        <input
          className={styles.input}
          type="password"
          aria-label="Enter Password"
          placeholder="Password"
        />
        <div className={styles.actionButton}>
          <span>Sign up</span>
          <button aria-label="sign up">
            <BsArrowRight />
          </button>
        </div>
      </form>
      <Link href="/sign-in">
        <a className={styles.link}>Sign in</a>
      </Link>
    </div>
  );
};

export default SignUp;

const SignInForm = () => {};

const UsernameForm = () => {
  const { user } = useContext(UserContext);

  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    createUser(user, formValue);
  };

  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const regex = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (regex.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsernameValid(formValue).then((res) => {
      setIsValid(res);
      setLoading(false);
    });
  }, [formValue]);

  return (
    <>
      <h3>Choose Username</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="username-input">create username</label>
        <input
          id="username-input"
          type="text"
          placeholder="username"
          value={formValue}
          onChange={onChange}
        />

        <UsernameMessage
          username={formValue}
          isValid={isValid}
          loading={loading}
        />

        <button disabled={!isValid}>Choose username</button>
      </form>
    </>
  );
};

const UsernameMessage = ({ username, isValid, loading }) => {
  if (loading) return <p>Checking...</p>;
  if (isValid) return <p className="text-success">{username} is available!</p>;
  if (username?.length <= 3) return <p>That username is too short!</p>;
  if (username && !isValid)
    return <p className="text-danger">That username is taken!</p>;
  return <></>;
};
