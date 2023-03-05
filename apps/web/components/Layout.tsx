import React, { Fragment, useState, useEffect } from "react";
import { UI, NavBarFullScreen, Footer } from "@myth/ui";
import { Aside } from "./Aside";
import { OpenGraph } from "./OpenGraph";
import { Disqus } from "./Disqus";
import networks from "../data/networks";
import sections from "../data/sections";

interface Props {
  heading?: React.ReactNode | React.ReactElement | string;
  children: React.ReactNode;
  metadata?: {
    title?: string;
    summary?: string;
    createdAt?: string;
    slug?: string;
    tags?: {
      name: string;
      slug: string;
    };
  };
  type?: string;
}

export const Layout = ({
  heading,
  children,
  metadata = {},
  type = "post",
}: Props) => {
  const isBlogTemplate = type === "post" && metadata.createdAt ? true : false;

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fragment>
      <OpenGraph metadata={metadata} />

      <NavBarFullScreen isScrolled={isScrolled} navs={sections} />

      <UI.Container maxW="container.xl" py={16}>
        {heading && (
          <UI.Heading as="h2" fontSize="2xl" mb={8}>
            {heading}
          </UI.Heading>
        )}
        <UI.Flex
          direction={["column", "column", "row", "row"]}
          flexWrap="wrap"
          mx={-2}
        >
          <UI.Box
            maxW={["100%", "100%", "100%", "75%"]}
            flexBasis={["100%", "100%", "100%", "75%"]}
            px={2}
          >
            <UI.Box
              as={isBlogTemplate ? "article" : "section"}
              mb={16}
              mr={[0, 0, 0, 20]}
            >
              {children}

              {isBlogTemplate && (
                <UI.Stack spacing={10} my={16} align="center">
                  {metadata.slug && metadata.title && (
                    <Disqus
                      shortname="alckordev"
                      config={{
                        url: `http://localhost:3000/${metadata.slug}`,
                        identifier: metadata.slug ?? "",
                        title: metadata.title ?? "",
                      }}
                    />
                  )}
                </UI.Stack>
              )}
            </UI.Box>
          </UI.Box>
          <UI.Box
            display={["", "", "", "flex"]}
            maxW={["100%", "100%", "100%", "25%"]}
            flexBasis={["100%", "100%", "100%", "25%"]}
            px={2}
          >
            <Aside />
          </UI.Box>
        </UI.Flex>
      </UI.Container>

      <Footer networks={networks} />
    </Fragment>
  );
};
