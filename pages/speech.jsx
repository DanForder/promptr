import Layout from "../components/Layout";
import { useSpeechInput } from "../lib/hooks";

export default function SpeechInput() {
  const { startSpeech, stopSpeech, interimTranscript, finalTranscript } =
    useSpeechInput("es");

  return (
    <Layout showNavbar>
      <p>interim: {interimTranscript || "interim default"}</p>
      <p>final: {finalTranscript || "final default"}</p>

      <br />

      <button style={{ color: "black" }} onClick={startSpeech}>
        Start
      </button>

      <br />

      <button style={{ color: "black" }} onClick={stopSpeech}>
        Stop
      </button>
    </Layout>
  );
}
