import { UI } from "@myth/ui";
import { Layout } from "../components";

export default function Web() {
  return (
    <Layout metadata={{ title: "My Web", date: "2023-02-24" }}>
      <UI.Box>
        <UI.Heading as="h1">First Post</UI.Heading>
        <UI.Text marginBottom={2}>Lorem ipsum</UI.Text>
      </UI.Box>
    </Layout>
  );
}
