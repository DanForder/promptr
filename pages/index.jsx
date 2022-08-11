import Link from "next/link";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout requiresAuth showNavbar>
      <h1>promptr</h1>
      <Link href="/prompts/create">
        <a>Create a prompt</a>
      </Link>
    </Layout>
  );
}
