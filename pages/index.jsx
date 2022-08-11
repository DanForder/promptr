import AuthCheck from "../components/AuthCheck";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout requiresAuth showNavbar>
      <h1>Promptology</h1>
    </Layout>
  );
}
