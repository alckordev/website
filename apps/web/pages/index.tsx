import { UI, CIcon, icon } from "@myth/ui";
import { Layout } from "../components";

export default function Web() {
  return (
    <Layout metadata={{ title: "My Web" }}>
      <UI.Box>
        <UI.Heading as="h1">Web</UI.Heading>
        <UI.Text marginBottom={2}>Lorem ipsum</UI.Text>
        <UI.Flex as="p" gap={1} alignItems="center">
          <CIcon icon={icon.riGithubFill} size="xl" />
          Lorem ipsu
        </UI.Flex>
      </UI.Box>
      <UI.Box>
        <UI.Heading as="h1">Web</UI.Heading>
        <UI.Text marginBottom={2}>Lorem ipsum</UI.Text>
        <UI.Flex as="p" gap={1} alignItems="center">
          <CIcon icon={icon.riGithubFill} size="xl" />
          Lorem ipsu
        </UI.Flex>
      </UI.Box>
      <UI.Box>
        <UI.Heading as="h1">Web</UI.Heading>
        <UI.Text marginBottom={2}>Lorem ipsum</UI.Text>
        <UI.Flex as="p" gap={1} alignItems="center">
          <CIcon icon={icon.riGithubFill} size="xl" />
          Lorem ipsu
        </UI.Flex>
      </UI.Box>
      <UI.Box>
        <UI.Heading as="h1">Web</UI.Heading>
        <UI.Text marginBottom={2}>Lorem ipsum</UI.Text>
        <UI.Flex as="p" gap={1} alignItems="center">
          <CIcon icon={icon.riGithubFill} size="xl" />
          Lorem ipsu
        </UI.Flex>
      </UI.Box>
    </Layout>
  );
}
