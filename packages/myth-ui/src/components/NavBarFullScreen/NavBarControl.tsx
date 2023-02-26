import styled from "@emotion/styled";
import { Flex } from "@chakra-ui/react";
import CIcon from "@coreui/icons-react";
import { riMoonFill, riMenuLine } from "../../icons";

const StyledBox = styled.div`
  display: inline-flex;
  cursor: pointer;
  appearance: none;
  align-items: center;
  justify-content: center;
  use-selector: none;
  position: relative;
  white-space: nowrap;
  border-radius: var(--chakra-radii-md);
  font-weight: var(--chakra-fontWeights-semibold);
  height: var(--chakra-sizes-10);
  min-width: var(--chakra-sizes-10);
  background-color: transparent;
  color: var(--chakra-colors-gray-100);
  &:hover {
    background-color: var(--chakra-colors-blackAlpha-100);
  }
`;

interface Props {
  isMobile: boolean;
  isOpen?: boolean;
  toggle(): void;
}

export const NavBarControl = ({ isMobile, isOpen, toggle }: Props) => {
  return (
    <Flex align="center">
      <StyledBox onClick={() => console.log("theme")}>
        <CIcon icon={riMoonFill} size="lg" />
      </StyledBox>
      {isMobile && (
        <StyledBox onClick={toggle}>
          <CIcon icon={riMenuLine} size="lg" />
        </StyledBox>
      )}
    </Flex>
  );
};
