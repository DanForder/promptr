import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { CirclePicker } from "react-color";
import { BsArrowRight } from "react-icons/bs";
import ActionButton from "../../components/ActionButton";
import Layout from "../../components/Layout";
import PromptCard from "../../components/PromptCard";
import { UserContext } from "../../lib/context";
import { createPrompt } from "../../lib/firebase";
import { getRandomIntInBounds } from "../../lib/utils";
import styles from "../../styles/promptCreate.module.scss";

const colors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#e7910f",
  "#e7572b",
  "#694a3e",
  "#597380",
];

const CreatePrompt = ({}) => {
  const router = useRouter();
  const { displayName } = useContext(UserContext);

  const [color, setColor] = useState(
    colors[getRandomIntInBounds(0, colors.length)]
  );
  const [prompt, setPrompt] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!prompt || !color) return console.error("fill in fields");

    createPrompt(prompt, color, displayName);
    router.push("/");
  };

  return (
    <Layout requiresAuth showNavbar>
      <h1>Create a prompt</h1>

      <form className={styles.promptForm} onSubmit={onSubmit}>
        <PromptCard
          backgroundColor={color}
          editable
          value={prompt}
          updatePrompt={setPrompt}
        />
        <label className={styles.colorPicker} htmlFor="color-picker">
          Select color
          <CirclePicker
            onChange={({ hex }) => setColor(hex)}
            id="color-picker"
            width="18.75rem"
            triangle="hide"
            colors={colors}
          />
        </label>

        <ActionButton Icon={BsArrowRight} label="Submit prompt" centered />
      </form>
    </Layout>
  );
};

export default CreatePrompt;
