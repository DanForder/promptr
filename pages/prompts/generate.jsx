import { useEffect, useState } from "react";
import { RiLightbulbLine } from "react-icons/ri";
import ActionButton from "../../components/ActionButton";
import Layout from "../../components/Layout";
import PromptCard from "../../components/PromptCard";
import { getRandomPrompt } from "../../lib/firebase";

const GeneratePrompt = ({}) => {
  const [prompt, setPrompt] = useState(undefined);

  const getPrompt = async () => {
    const result = await getRandomPrompt();
    setPrompt(result);
  };

  useEffect(() => {
    getPrompt();
  }, []);

  return (
    <Layout requiresAuth showNavbar>
      <h1>Generate a prompt</h1>
      {prompt && (
        <PromptCard
          backgroundColor={prompt.backgroundColor}
          submittedBy={prompt.submittedBy}
          value={prompt.text}
          dateSubmitted={prompt.dateSubmitted}
        />
      )}
      <ActionButton
        onClick={getPrompt}
        Icon={RiLightbulbLine}
        label="New prompt"
        centered
      />
    </Layout>
  );
};

export default GeneratePrompt;
