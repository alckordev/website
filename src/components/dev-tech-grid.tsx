"use client";

import { AspectRatio, Flex, Tooltip } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import {
  ArkUI,
  ArkUIUrl,
  Auth0,
  Auth0Url,
  ChakraUI,
  ChakraUIUrl,
  Firebase,
  FirebaseUrl,
  JWT,
  JWTUrl,
  Laravel,
  LaravelUrl,
  MicrosoftSQLServer,
  MicrosoftSQLServerUrl,
  MySQL,
  MySQLUrl,
  NestJS,
  NestJSUrl,
  Nextjs,
  NextjsUrl,
  Nodejs,
  NodejsUrl,
  PandaCSS,
  PandaCSSUrl,
  PhpDark,
  PhpUrl,
  PostgreSQL,
  PostgreSQLUrl,
  ReactLight,
  ReactQuery,
  ReactQueryUrl,
  ReactUrl,
  Supabase,
  SupabaseUrl,
  TailwindCSS,
  TailwindCSSUrl,
  Turborepo,
  TurborepoUrl,
  TypeScript,
  TypeScriptUrl,
  Zod,
  ZodUrl,
} from "@ridemountainpig/svgl-react";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

export const DevTechGrid = () => {
  const autoplay = useRef(Autoplay({ delay: 5000 }));

  return (
    <Carousel
      withControls={false}
      slideSize={{ base: "10%", sm: "8%" }}
      slideGap="md"
      emblaOptions={{ loop: true, align: "center" }}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={() => autoplay.current.play()}
      pos="relative"
    >
      {techs.map((tech, idx) => (
        <Carousel.Slide key={idx}>
          <Tooltip label={tech.label}>
            <AspectRatio ratio={1 / 1}>
              <Flex align="center" justify="center">
                {tech.component}
              </Flex>
            </AspectRatio>
          </Tooltip>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

type Tech = {
  label: string;
  component: React.ReactNode;
  url: string;
};

const techs: Tech[] = [
  {
    label: "NestJS",
    component: <NestJS />,
    url: NestJSUrl,
  },
  {
    label: "Nextjs",
    component: <Nextjs />,
    url: NextjsUrl,
  },
  {
    label: "Laravel",
    component: <Laravel />,
    url: LaravelUrl,
  },
  {
    label: "ReactQuery",
    component: <ReactQuery />,
    url: ReactQueryUrl,
  },
  {
    label: "TailwindCSS",
    component: <TailwindCSS />,
    url: TailwindCSSUrl,
  },
  {
    label: "Firebase",
    component: <Firebase />,
    url: FirebaseUrl,
  },
  {
    label: "Supabase",
    component: <Supabase />,
    url: SupabaseUrl,
  },
  {
    label: "PostgreSQL",
    component: <PostgreSQL />,
    url: PostgreSQLUrl,
  },
  {
    label: "MySQL",
    component: <MySQL />,
    url: MySQLUrl,
  },
  {
    label: "MicrosoftSQLServer",
    component: <MicrosoftSQLServer />,
    url: MicrosoftSQLServerUrl,
  },
  {
    label: "TypeScript",
    component: <TypeScript />,
    url: TypeScriptUrl,
  },
  {
    label: "Php",
    component: <PhpDark />,
    url: PhpUrl,
  },
  {
    label: "Auth0",
    component: <Auth0 />,
    url: Auth0Url,
  },
  {
    label: "JWT",
    component: <JWT />,
    url: JWTUrl,
  },
  {
    label: "ChakraUI",
    component: <ChakraUI />,
    url: ChakraUIUrl,
  },
  {
    label: "Panda CSS",
    component: <PandaCSS />,
    url: PandaCSSUrl,
  },
  {
    label: "Nodejs",
    component: <Nodejs />,
    url: NodejsUrl,
  },
  {
    label: "React",
    component: <ReactLight />,
    url: ReactUrl,
  },
  {
    label: "Zod",
    component: <Zod />,
    url: ZodUrl,
  },
  {
    label: "Turborepo",
    component: <Turborepo />,
    url: TurborepoUrl,
  },
  {
    label: "Ark UI",
    component: <ArkUI />,
    url: ArkUIUrl,
  },
];
