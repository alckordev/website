import React, { Fragment, useContext, useState, useEffect } from "react";
import { UI, useColorModeValue, NavBarFullScreen, Footer } from "@myth/ui";
import { Aside } from "./Aside";
import { OpenGraph } from "./OpenGraph";
import { Search } from "./Search";
import networks from "../data/networks";
import sections from "../data/sections";
import { SignInAllButtons, SignInButton, SignOutButton } from "./Auth";
import { AuthContext } from "../store/AuthContextProvider";

interface Props {
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

export const Layout = ({ children, metadata = {}, type = "post" }: Props) => {
  const isBlogTemplate = type === "post" && metadata.createdAt ? true : false;

  const { currentUser, isOpenSignIn, onCloseSignIn } = useContext(AuthContext);

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

      <NavBarFullScreen
        isScrolled={isScrolled}
        searchBox={Search}
        navs={sections}
        user={currentUser}
        signInButton={SignInButton}
        signOutButton={SignOutButton}
      />

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
            <UI.Box as={isBlogTemplate ? "article" : "section"}>
              {children}
            </UI.Box>
          </UI.Box>

          <UI.Box
            minW={[null, null, null, 352, 368]}
            maxW={[null, null, null, 352, 368]}
            display={["none", "none", "none", "block"]}
            flex="1 1 auto"
            minH="100vh"
            borderLeft="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.958")}
            pl={[null, null, 6, "clamp(24px, 24px + 100vw - 1080px, 40px)"]}
            pr={[null, null, null, 6]}
            py="50px"
          >
            <Aside />
          </UI.Box>
        </UI.Flex>
      </UI.Container>

      <Footer networks={networks} />

      <SignInAllButtons isOpen={isOpenSignIn} onClose={onCloseSignIn} />
    </Fragment>
  );
};
