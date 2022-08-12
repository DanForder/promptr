import styles from "../styles/textField.module.scss";

const TextField = ({
  type = "text",
  placeholder,
  ariaLabel,
  value,
  onChange,
}) => (
  <input
    className={styles.input}
    type={type}
    aria-label={ariaLabel}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default TextField;
