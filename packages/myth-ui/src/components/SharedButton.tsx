import React, { useState, useRef } from "react";
import {
  Box,
  ButtonGroup,
  Flex,
  Link,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import CIcon from "@coreui/icons-react";
import copy from "copy-to-clipboard";
import { riFacebookLine, riTwitterLine, riLinkLine } from "../icons";

export const SharedButton = React.forwardRef(
  (
    { children, url, ...rest }: { children: React.ReactNode; url: string },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [isHovering, setIsHovering] = useState(false);

    const defaultRef = useRef<HTMLDivElement>(null);
    const resolvedRef = ref || defaultRef;

    const handleCopyToClipboard = () => {
      copy(url);
    };

    return (
      <Flex
        ref={resolvedRef}
        gap={2}
        position="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Box arial-label="shared" cursor="pointer" {...rest}>
          {children}
        </Box>
        <motion.div
          initial={{ opacity: 0, visibility: "hidden", y: 20 }}
          animate={{
            opacity: isHovering ? 1 : 0,
            visibility: isHovering ? "visible" : "hidden",
            y: isHovering ? 0 : 20,
          }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          <ButtonGroup size="sm" variant="ghost">
            <IconButton
              as={Link}
              href={`https://www.facebook.com/sharer.php?u=${url}`}
              aria-label="Compartir en facebook"
              icon={<CIcon icon={riFacebookLine} size="sm" />}
              colorScheme="facebook"
              isExternal
            />
            <IconButton
              as={Link}
              href={`https://twitter.com/intent/tweet?url=${url}`}
              aria-label="Compartir en twitter"
              icon={<CIcon icon={riTwitterLine} size="sm" />}
              colorScheme="twitter"
              isExternal
            />
            <Tooltip label="Haz clic para copiar el enlace">
              <IconButton
                aria-label="Copiar enlace"
                icon={<CIcon icon={riLinkLine} size="sm" />}
                onClick={handleCopyToClipboard}
              />
            </Tooltip>
          </ButtonGroup>
        </motion.div>
      </Flex>
    );
  }
);
