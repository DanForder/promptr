import Link from "next/link";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import styles from "../styles/enter.module.scss";

const EnterForm = ({
  onSubmit,
  inputArray,
  altLink,
  altLinkText,
  submitText,
  heading,
  error,
}) => {
  const initialState = {};
  inputArray.forEach(({ name }) => {
    initialState[name] = "";
  });

  const [form, setForm] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    let isValid = true;
    inputArray.forEach(({ name }) => {
      if (!form[name]) {
        isValid = false;
        return;
      }
    });

    if (!isValid) return console.log("form has empty fields");
    onSubmit(form);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>{heading}</h1>
      {error && (
        <p className={["text-danger", styles.error].join(" ")}>{error}</p>
      )}
      <form onSubmit={handleSubmit} className={styles.form}>
        {inputArray.map(({ name, type }) => (
          <input
            key={name}
            className={styles.input}
            type={type}
            aria-label={`Enter ${name}`}
            placeholder={name}
            value={form[name]}
            onChange={(e) =>
              setForm((prevState) => {
                return {
                  ...prevState,
                  [name]: e.target.value,
                };
              })
            }
          />
        ))}
        <div className={styles.actionButton}>
          <span>{submitText}</span>
          <button aria-label={submitText}>
            <BsArrowRight />
          </button>
        </div>
      </form>
      <Link href={altLink}>
        <a className={styles.link}>{altLinkText}</a>
      </Link>
    </div>
  );
};

export default EnterForm;
