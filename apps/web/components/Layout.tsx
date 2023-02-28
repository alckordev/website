import React, { Fragment, useState, useEffect } from "react";
import { UI, NavBarFullScreen, Footer } from "@myth/ui";
import { Aside } from "./Aside";
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
  const isBlogTemplate = type === "post" && metadata.date ? true : false;

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
      <NavBarFullScreen isScrolled={isScrolled} navs={sections} />

      <UI.Container maxW="container.xl" py={16}>
        <UI.Flex
          direction={["column", "column", "row", "row"]}
          flexWrap="wrap"
          mx={-4}
        >
          <UI.Box flexBasis={["100%", "100%", "65%", "75%"]} px={4}>
            <UI.Box as={isBlogTemplate ? "article" : "section"} mb={16}>
              {children}
            </UI.Box>
            {isBlogTemplate && (
              <UI.Stack as="aside" spacing={10} my={16} align="center">
                <div id="comments">Comentarios</div>
              </UI.Stack>
            )}
          </UI.Box>
          <UI.Box flexBasis={["100%", "100%", "35%", "25%"]} px={4}>
            <Aside isBlogTemplate={isBlogTemplate} />
          </UI.Box>
        </UI.Flex>
      </UI.Container>

      <Footer networks={networks} />
    </Fragment>
  );
};
