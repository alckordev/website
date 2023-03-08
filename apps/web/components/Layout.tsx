import React, { Fragment, useState, useEffect } from "react";
import { UI, useColorModeValue, NavBarFullScreen, Footer } from "@myth/ui";
import { Aside } from "./Aside";
import { OpenGraph } from "./OpenGraph";
import networks from "../data/networks";
import sections from "../data/sections";
import { PostFooter } from "./PostFooter";

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

      <UI.Container maxW="container.2xl" px={6}>
        <UI.Flex
          direction={["column", "column", "column", "row"]}
          justify="space-evenly"
          mx={-6}
        >
          <UI.Box
            minW={[0, 0, 0, 0, 728, 790]}
            maxW={[null, null, null, null, 728, 790]}
            display="block"
            flex="1 1 auto"
            py="50px"
            px={6}
          >
            {heading && (
              <Fragment>
                <UI.Heading as="h2" fontSize="sm" fontWeight="semibold">
                  {heading}
                </UI.Heading>
                <UI.Divider
                  borderColor={useColorModeValue("gray.200", "gray.900")}
                  opacity={1}
                  my={7}
                />
              </Fragment>
            )}
            <UI.Box as={isBlogTemplate ? "article" : "section"}>
              {children}

              {isBlogTemplate && (
                <PostFooter title={metadata.title} slug={metadata.slug} />
              )}
            </UI.Box>
          </UI.Box>

          <UI.Box
            minW={[null, null, null, 352, 368]}
            maxW={[null, null, null, 352, 368]}
            display={["none", "none", "none", "block"]}
            flex="1 1 auto"
            minH="100vh"
            borderLeft="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.900")}
            pl={[null, null, 6, "clamp(24px, 24px + 100vw - 1080px, 40px)"]}
            pr={[null, null, null, 6]}
            py="50px"
          >
            <Aside />
          </UI.Box>
        </UI.Flex>
      </UI.Container>

      <Footer networks={networks} />
    </Fragment>
  );
};
