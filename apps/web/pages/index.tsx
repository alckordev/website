import { UI, CIcon, icon } from "ui";

export default function Web() {
  return (
    <div>
      <UI.Heading as="h1">Web</UI.Heading>
      <UI.Text>Lorem ipsum</UI.Text>
      <UI.Text>
        <CIcon icon={icon.riGithubFill} size="xl" />
        Lorem ipsu
      </UI.Text>
    </div>
  );
}
