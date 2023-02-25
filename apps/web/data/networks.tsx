import { icon as svg } from "@myth/ui";

interface Type {
  icon: string[];
  url: string;
}

const networks: Type[] = [
  {
    icon: svg.riYoutubeLine,
    url: "https://www.youtube.com/@alckordev?sub_confirmation=1",
  },
  {
    icon: svg.riFacebookLine,
    url: "https://www.facebook.com/@alckor.dev",
  },
  {
    icon: svg.riInstagramLine,
    url: "https://www.instagram.com/alckor.dev",
  },
  {
    icon: svg.riGithubLine,
    url: "https://github.com/alckordev",
  },
  {
    icon: svg.riLinkedinLine,
    url: "https://www.linkedin.com/in/alckordev",
  },
];

export default networks;
