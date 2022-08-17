import ReactTextareaAutosize from "react-textarea-autosize";
import TinderCard from "react-tinder-card";
import styles from "../styles/promptCard.module.scss";

const PromptCard = ({
  cardRef,
  backgroundColor,
  editable = false,
  dateSubmitted,
  value,
  updatePrompt,
  submittedBy,
  onSwipe,
  onCardLeftScreen,
}) => {
  const cardJsx = (
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

  if (!onSwipe) return cardJsx;

  return (
    <TinderCard
      ref={cardRef}
      preventSwipe={["up", "down"]}
      onSwipe={onSwipe}
      onCardLeftScreen={onCardLeftScreen}
    >
      {cardJsx}
    </TinderCard>
  );
};

export default PromptCard;
