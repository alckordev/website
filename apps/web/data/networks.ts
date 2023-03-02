import { icon as svg } from "@myth/ui";

interface Type {
  name: string;
  icon: string[];
  url: string;
}

const networks: Type[] = [
  {
    name: "Youtube",
    icon: svg.riYoutubeLine,
    url: "https://www.youtube.com/@alckordev?sub_confirmation=1",
  },
  {
    name: "Facebook",
    icon: svg.riFacebookLine,
    url: "https://www.facebook.com/@alckor.dev",
  },
  {
    name: "Instagram",
    icon: svg.riInstagramLine,
    url: "https://www.instagram.com/alckor.dev",
  },
  {
    name: "Github",
    icon: svg.riGithubLine,
    url: "https://github.com/alckordev",
  },
  {
    name: "Linkedin",
    icon: svg.riLinkedinLine,
    url: "https://www.linkedin.com/in/alckordev",
  },
];

export default networks;
