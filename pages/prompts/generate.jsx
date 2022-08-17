import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ImCheckmark, ImCross } from "react-icons/im";
import ActionButton from "../../components/ActionButton";
import Layout from "../../components/Layout";
import PromptCard from "../../components/PromptCard";
import { getRandomPrompt } from "../../lib/firebase";
import styles from "../../styles/promptGenerate.module.scss";

const GeneratePrompt = ({}) => {
  const router = useRouter();

  const cardRef = useRef();

  const [prompt, setPrompt] = useState(undefined);

  // if we have a prompt on-screen, avoid it showing it again
  const getPrompt = async (prompt) => {
    const result = await getRandomPrompt(prompt?.id);
    setPrompt(result);
  };

  useEffect(() => {
    getPrompt();
  }, []);

  const onSwipe = (direction) => {
    console.log(`swiping card, direction: ${direction}`);
    if (direction === "right") {
      // TODO: use the prompt in firebase
      return router.push(`/prompts/${prompt.id}`);
    }

    if (direction === "left") {
      // wait 200 so prompt doesn't generate before card has left screen
      setTimeout(() => {
        getPrompt(prompt);
      }, 200);

      // TODO: dismiss prompt in firebase
      return;
    }

    console.log(`unhandled direction: ${direction}`);
  };

  return (
    <Layout requiresAuth showNavbar>
      <h1>Generate a prompt</h1>
      <div className={styles.wrapper}>
        {prompt && (
          <div className={styles.card}>
            <PromptCard
              cardRef={(ref) => {
                if (ref) cardRef = ref;
              }}
              onCardLeftScreen={() => {
                cardRef.restoreCard();
              }}
              backgroundColor={prompt.backgroundColor}
              submittedBy={prompt.submittedBy}
              value={prompt.text}
              dateSubmitted={prompt.dateSubmitted}
              onSwipe={onSwipe}
            />
          </div>
        )}
        <div className={styles.buttonWrapper}>
          <ActionButton
            onClick={() => {
              cardRef.swipe("left");
            }}
            Icon={ImCross}
            label="Dismiss prompt"
            centered
          />
          <ActionButton
            onClick={() => {
              cardRef.swipe("right");
            }}
            Icon={ImCheckmark}
            label="Use prompt"
            centered
          />
        </div>
      </div>
    </Layout>
  );
};

export default GeneratePrompt;
