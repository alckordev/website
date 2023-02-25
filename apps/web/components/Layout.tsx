import React, { Fragment } from "react";
import { UI, NavBar, Footer } from "@myth/ui";
import networks from "../data/networks";

interface Props {
  children: React.ReactNode;
  metadata?: {
    title?: string;
    date?: string;
  };
  type?: string;
}

export const Layout = ({ children, metadata = {}, type = "post" }: Props) => {
  const isBlogTemplate = type === "post" && metadata.date;

  console.log(isBlogTemplate);

  return (
    <Fragment>
      <NavBar />

      <UI.Container maxW="container.md" pt="8">
        <UI.Flex direction="column">
          <UI.Box as="article" my={4} width="100%">
            {isBlogTemplate ? (
              "Post Title"
            ) : (
              <UI.Heading as="h2" my={8} size="xl">
                {metadata.title}
              </UI.Heading>
            )}

            <UI.Box m="0" as="section">
              {children}
            </UI.Box>

            {isBlogTemplate && <aside id="comments">Comentarios</aside>}
          </UI.Box>

          {type === "post" && (
            <UI.Stack as="aside" spacing="24px" my="4" width="100%">
              Newsletter
            </UI.Stack>
          )}
        </UI.Flex>
      </UI.Container>

      <Footer networks={networks} />
    </Fragment>
  );
};
