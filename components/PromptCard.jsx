import ReactTextareaAutosize from "react-textarea-autosize";
import styles from "../styles/promptCard.module.scss";

const PromptCard = ({
  backgroundColor,
  editable = false,
  dateSubmitted,
  value,
  updatePrompt,
  submittedBy,
}) => (
  <div className={styles.wrapper} style={{ backgroundColor }}>
    <ReactTextareaAutosize
      className={styles.input}
      disabled={!editable}
      aria-label="enter your prompt"
      placeholder="enter your prompt..."
      onChange={(e) => updatePrompt(e.target.value)}
      value={value}
    />
    {dateSubmitted && submittedBy && (
      <span className={styles.submittedText}>
        Submitted by <strong>{submittedBy}</strong> - {dateSubmitted}
      </span>
    )}
  </div>
);

export default PromptCard;
