import Link from "next/link";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import ActionButton from "../components/ActionButton";
import styles from "../styles/enter.module.scss";
import TextField from "./TextField";

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

    let isValid = true;
    inputArray.forEach(({ name }) => {
      if (!form[name]) {
        isValid = false;
        return;
      }
    });

    if (!isValid) return;
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
          <TextField
            key={name}
            type={type}
            ariaLabel={`Enter ${name}`}
            placeholder={name}
            value={form[name]}
            onChange={(e) =>
              setForm((prev) => {
                return {
                  ...prev,
                  [name]: e.target.value,
                };
              })
            }
          />
        ))}
        <ActionButton label={submitText} Icon={BsArrowRight} />
      </form>
      <Link href={altLink}>
        <a className={styles.link}>{altLinkText}</a>
      </Link>
    </div>
  );
};

export default EnterForm;
