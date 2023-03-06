import styled from "@emotion/styled";
import { Button, Flex, useColorMode } from "@chakra-ui/react";
import CIcon from "@coreui/icons-react";
import { riMenuLine, riMoonFill, riSunFill } from "../../icons";

const StyledBox = styled(Button)`
  background-color: transparent;
  padding: 0;
`;

interface Props {
  isMobile: boolean;
  hasItems: boolean;
  toggle(): void;
}

export const NavBarControl = ({ isMobile, hasItems, toggle }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex align="center">
      <StyledBox onClick={toggleColorMode}>
        <CIcon icon={colorMode === "dark" ? riMoonFill : riSunFill} />
      </StyledBox>
      {isMobile && hasItems && (
        <StyledBox onClick={toggle}>
          <CIcon icon={riMenuLine} />
        </StyledBox>
      )}
    </Flex>
  );
};
