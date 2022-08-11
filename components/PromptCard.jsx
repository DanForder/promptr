import { useContext } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { UserContext } from "../lib/context";
import styles from "../styles/promptCard.module.scss";

const PromptCard = ({
  backgroundColor,
  editable = false,
  dateSubmitted = new Date().toLocaleString(),
}) => {
  const { displayName } = useContext(UserContext);

  return (
    <div className={styles.wrapper} style={{ backgroundColor }}>
      <ReactTextareaAutosize
        className={styles.input}
        disabled={!editable}
        aria-label="enter your prompt"
        placeholder="enter your prompt..."
      />
      {dateSubmitted && (
        <span className={styles.submittedText}>
          Submitted by {displayName} - {dateSubmitted}
        </span>
      )}
    </div>
  );
};

export default PromptCard;
