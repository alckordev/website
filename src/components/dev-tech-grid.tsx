"use client";

import { Box, Grid, ThemeIcon, Tooltip } from "@mantine/core";
import {
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

export const DevTechGrid = () => {
  return (
    <Box>
      <Grid>
        {techs.map((tech) => (
          <Grid.Col key={tech.url} span="content">
            <Tooltip label={tech.label}>
              <ThemeIcon color="brand-dark.6" size="xl" p={4}>
                {tech.component}
              </ThemeIcon>
            </Tooltip>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
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
];
