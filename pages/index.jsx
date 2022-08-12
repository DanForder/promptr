import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout requiresAuth showNavbar>
      <h1>promptr</h1>

      <br />

      <Link href="/prompts/generate">
        <a>Generate a prompt</a>
      </Link>

      <br />

      <Link href="/prompts/create">
        <a>Create a prompt</a>
      </Link>

      <br />

      <Link href="/prompts/all">
        <a>View all prompts</a>
      </Link>
    </Layout>
  );
}
