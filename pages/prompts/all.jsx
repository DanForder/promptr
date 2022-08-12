import { collectionGroup, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Layout from "../../components/Layout";
import PromptCard from "../../components/PromptCard";
import { firestore, promptToJSON } from "../../lib/firebase";

const AllPrompts = ({}) => {
  const [querySnapshot] = useCollection(
    query(
      collectionGroup(firestore, "prompts"),
      orderBy("dateSubmitted", "desc")
    )
  );

  const prompts = querySnapshot?.docs.map(promptToJSON);

  return (
    <Layout requiresAuth showNavbar>
      <h1>View all prompts</h1>
      {prompts?.map(({ backgroundColor, text, dateSubmitted, submittedBy }) => {
        return (
          <PromptCard
            key={dateSubmitted}
            backgroundColor={backgroundColor}
            value={text}
            dateSubmitted={dateSubmitted}
            submittedBy={submittedBy}
          />
        );
      })}
    </Layout>
  );
};

export default AllPrompts;
