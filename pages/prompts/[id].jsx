import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import PromptCard from "../../components/PromptCard";
import { getPrompt } from "../../lib/firebase";

const Prompt = ({}) => {
  const router = useRouter();
  let { id } = router.query;

  const [prompt, setPrompt] = useState();

  const handleGetPrompt = async (id) => {
    if (!id) return;
    setPrompt(await getPrompt(id));
  };

  useEffect(() => {
    handleGetPrompt(id);
  }, [id]);

  return (
    <Layout requiresAuth showNavbar>
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

export default Prompt;
