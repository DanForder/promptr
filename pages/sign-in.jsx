import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import styles from "../styles/enter.module.scss";

const SignIn = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Welcome Back</h1>
      <form onSubmit={onSubmit} className={styles.form}>
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
      <Link href="/sign-up">
        <a className={styles.link}>Sign up</a>
      </Link>
    </div>
  );
};

export default SignIn;
