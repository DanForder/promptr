import { collectionGroup, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Layout from "../../components/Layout";
import PromptCard from "../../components/PromptCard";
import { firestore } from "../../lib/firebase";

// convert firestore doc to JSON (firestore timestamps different to js timestamp)
export const postToJSON = (doc) => {
  const data = doc.data();
  return {
    ...data,
    timestamp: data.timestamp.toMillis(),
  };
};

const AllPrompts = ({}) => {
  const q = query(collectionGroup(firestore, "prompts"));
  const [querySnapshot] = useCollection(q);

  const prompts = querySnapshot?.docs.map(postToJSON);

  console.log(prompts);
  return (
    <Layout requiresAuth showNavbar>
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
