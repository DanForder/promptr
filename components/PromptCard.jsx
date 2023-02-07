import ReactTextareaAutosize from "react-textarea-autosize";
import TinderCard from "react-tinder-card";
import styles from "../styles/promptCard.module.scss";

const PromptCard = ({
  cardRef,
  backgroundColor = "#03a9f4",
  editable = false,
  dateSubmitted,
  value,
  updatePrompt,
  submittedBy,
  onSwipe,
  onCardLeftScreen,
  onClick,
}) => {
  const cardJsx = (
    <div
      className={styles.wrapper}
      style={{ backgroundColor }}
      onClick={onClick}
    >
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
      onCardLeftScreen={(direction) => {
        onCardLeftScreen(direction);
      }}
    >
      {cardJsx}
    </TinderCard>
  );
};

export default PromptCard;
