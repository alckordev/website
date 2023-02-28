import styled from "@emotion/styled";
import { Button, Flex, useColorMode } from "@chakra-ui/react";
import CIcon from "@coreui/icons-react";
import { riMenuLine, riMoonFill, riSunFill } from "../../icons";

const StyledBox = styled(Button)`
  background-color: transparent;
  padding: 0;
  // &:hover {
  //   background-color: var(--chakra-colors-whiteAlpha-200);
  // }
`;

interface Props {
  isMobile: boolean;
  toggle(): void;
}

export const NavBarControl = ({ isMobile, toggle }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex align="center">
      <StyledBox onClick={toggleColorMode}>
        <CIcon icon={colorMode === "dark" ? riMoonFill : riSunFill} />
      </StyledBox>
      {isMobile && (
        <StyledBox onClick={toggle}>
          <CIcon icon={riMenuLine} />
        </StyledBox>
      )}
    </Flex>
  );
};
