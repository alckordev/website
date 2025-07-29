import { Fira_Code, Montserrat, Roboto } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"] });
const fira = Fira_Code({ subsets: ["latin"] });

const fonts = {
  heading: montserrat.style.fontFamily,
  body: roboto.style.fontFamily,
  mono: fira.style.fontFamily,
};

export default fonts;
