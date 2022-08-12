import { useEffect, useState } from "react";
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
    </Layout>
  );
};

export default GeneratePrompt;
