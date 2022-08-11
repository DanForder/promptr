import { useState } from "react";
import { CirclePicker } from "react-color";
import Layout from "../../components/Layout";
import PromptCard from "../../components/PromptCard";
import { getRandomIntInBounds } from "../../lib/utils";

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
  const [color, setColor] = useState(
    colors[getRandomIntInBounds(0, colors.length)]
  );

  const onSubmit = (e) => {
    e.preventDefault();

    console.log("form submitted");
  };

  return (
    <Layout requiresAuth showNavbar>
      <h1 style={{ textAlign: "center" }}>Create a prompt</h1>
      <br />
      <form onSubmit={onSubmit}>
        <PromptCard backgroundColor={color} editable />

        <br />
        <br />

        <label htmlFor="color-picker">Select color</label>
        <br />
        <br />
        <CirclePicker
          onChange={({ hex }) => setColor(hex)}
          id="color-picker"
          width="18.75rem"
          triangle="hide"
          colors={colors}
        />
      </form>
    </Layout>
  );
};

export default CreatePrompt;
