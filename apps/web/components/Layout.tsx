import React, { Fragment, useState, useEffect } from "react";
import { UI, NavBar, Footer } from "@myth/ui";
import networks from "../data/networks";
import sections from "../data/sections";

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

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fragment>
      <NavBar navs={sections} isScrolled={isScrolled} />

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
