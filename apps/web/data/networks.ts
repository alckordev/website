import { icons } from "@myth/ui";

interface Type {
  name: string;
  icon: string[];
  url: string;
}

const networks: Type[] = [
  {
    name: "Youtube",
    icon: icons.riYoutubeLine,
    url: "https://www.youtube.com/@alckordev?sub_confirmation=1",
  },
  {
    name: "Facebook",
    icon: icons.riFacebookLine,
    url: "https://www.facebook.com/@alckor.dev",
  },
  {
    name: "Instagram",
    icon: icons.riInstagramLine,
    url: "https://www.instagram.com/alckor.dev",
  },
  {
    name: "Github",
    icon: icons.riGithubLine,
    url: "https://github.com/alckordev",
  },
  {
    name: "Linkedin",
    icon: icons.riLinkedinLine,
    url: "https://www.linkedin.com/in/alckordev",
  },
];

export default networks;
