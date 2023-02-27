import React, { Fragment, useState, useEffect } from "react";
import { UI, NavBarFullScreen, Footer } from "@myth/ui";
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
      <NavBarFullScreen isScrolled={isScrolled} navs={sections} />

      <UI.Container maxW="container.lg" pt={8} pb={16}>
        <UI.Box as={isBlogTemplate ? "article" : "section"} my={8}>
          {children}
        </UI.Box>
        {isBlogTemplate && (
          <UI.Stack as="aside" spacing={10} my={4}>
            <div id="comments">Comentarios</div>
            <div id="newsletter">Newsletter</div>
          </UI.Stack>
        )}
      </UI.Container>

      <Footer networks={networks} />
    </Fragment>
  );
};
