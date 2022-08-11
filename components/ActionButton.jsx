import styles from "../styles/actionButton.module.scss";

const ActionButton = ({ Icon, text, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <span>{text}</span>
      <button onClick={onClick} aria-label={text}>
        <Icon />
      </button>
    </div>
  );
};

export default ActionButton;
