import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

const StyledOverlay = styled(Box)`
  background-color: var(--chakra-colors-black);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 0.7;
  z-index: -100;
`;

export const YouTubeOverlay = () => {
  return <StyledOverlay />;
};
