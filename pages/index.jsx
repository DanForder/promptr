import AuthCheck from "../components/AuthCheck";

export default function Home() {
  return (
    <AuthCheck>
      <h1>Promptology</h1>
    </AuthCheck>
  );
}
