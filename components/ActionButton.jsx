import classNames from "classnames";
import styles from "../styles/actionButton.module.scss";

const ActionButton = ({ Icon, label, onClick, centered = false }) => {
  const wrapperClassnames = classNames(styles.wrapper, {
    [styles.centered]: centered,
  });

  return (
    <div className={wrapperClassnames}>
      {centered || <span>{label}</span>}
      <button onClick={onClick} aria-label={label}>
        <Icon />
      </button>
    </div>
  );
};

export default ActionButton;
