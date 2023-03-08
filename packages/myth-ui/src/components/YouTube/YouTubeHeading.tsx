import styled from "@emotion/styled";
import { Box } from "@chakra-ui/react";

const StyledHeading = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-height: calc(100% - 100px);
  margin-bottom: var(--chakra-space-3);
  padding-bottom: var(--chakra-space-5);
  word-break: break-word;
  text-align: center;
`;

export const YouTubeHeading = ({ children }: any) => {
  return (
    <StyledHeading
      color="white"
      sx={{
        mask: "linear-gradient(to bottom, #000 calc(100% - 2.5em), transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, #000 calc(100% - 2.5em), transparent)",
      }}
    >
      {children}
    </StyledHeading>
  );
};
