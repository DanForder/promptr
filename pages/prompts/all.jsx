import { collectionGroup, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Layout from "../../components/Layout";
import PromptCard from "../../components/PromptCard";
import { firestore, promptToJSON } from "../../lib/firebase";

const AllPrompts = ({}) => {
  const [querySnapshot] = useCollection(
    query(collectionGroup(firestore, "prompts"))
  );

  const prompts = querySnapshot?.docs.map(promptToJSON);

  return (
    <Layout requiresAuth showNavbar>
      <h1>View all prompts</h1>
      {prompts?.map(({ backgroundColor, text, timestamp, submittedBy }) => {
        return (
          <PromptCard
            key={timestamp}
            backgroundColor={backgroundColor}
            value={text}
            dateSubmitted={new Date(timestamp).toLocaleString()}
            submittedBy={submittedBy}
          />
        );
      })}
    </Layout>
  );
};

export default AllPrompts;
