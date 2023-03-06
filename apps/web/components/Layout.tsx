import React, { Fragment, useState, useEffect } from "react";
import { UI, useColorModeValue, NavBarFullScreen, Footer } from "@myth/ui";
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

      <UI.Container maxW="container.xl">
        <UI.Flex
          direction={["column", "column", "column", "row"]}
          justify="space-between"
        >
          <UI.Box
            minW={[0, 0, 0, 0, 790]}
            maxW={["", "", "", "", 790]}
            display="block"
            flex="1 1 auto"
            py={16}
          >
            {heading && (
              <UI.Heading as="h2" fontSize="2xl" mb={8}>
                {heading}
              </UI.Heading>
            )}
            <UI.Box as={isBlogTemplate ? "article" : "section"}>
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
            minW={[0, 0, 0, 352, 368]}
            maxW={[0, 0, 0, 352, 368]}
            display="block"
            flex="1 1 auto"
            minH="100vh"
            borderLeft="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.900")}
            pl="clamp(24px, 24px + 100vw - 1080px, 40px)"
            py={16}
          >
            <Aside />
          </UI.Box>
        </UI.Flex>
      </UI.Container>

      <Footer networks={networks} />
    </Fragment>
  );
};
