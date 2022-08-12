import Link from "next/link";
import {
  RiChatNewLine,
  RiFileList3Line,
  RiLightbulbLine,
} from "react-icons/ri";
import ActionButton from "../components/ActionButton";
import Layout from "../components/Layout";

//TODO: pull out icons from ActionButton, use here
export default function Home() {
  return (
    <Layout requiresAuth showNavbar>
      <h1>promptr</h1>

      <br />

      <Link href="/prompts/generate">
        <a>
          <ActionButton label="Generate a prompt" Icon={RiLightbulbLine} />
        </a>
      </Link>

      <br />

      <Link href="/prompts/create">
        <a>
          <ActionButton label="Create a prompt" Icon={RiChatNewLine} />
        </a>
      </Link>

      <br />

      <Link href="/prompts/all">
        <a>
          <ActionButton label="View all prompts" Icon={RiFileList3Line} />
        </a>
      </Link>
    </Layout>
  );
}
