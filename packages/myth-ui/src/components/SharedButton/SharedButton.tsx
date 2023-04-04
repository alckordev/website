import React, { useRef } from "react";
import { Flex, IconButton } from "@chakra-ui/react";
import { motion, useCycle } from "framer-motion";
import CIcon from "@coreui/icons-react";
import { icons } from "../../icons";
import { SharedButtonGroup } from "./SharedButtonGroup";

const SharedButton = React.forwardRef(
  ({ url, ...rest }: { url: string }, ref: React.Ref<HTMLDivElement>) => {
    const [isOpen, toggleOpen] = useCycle(false, true);

    const defaultRef = useRef<HTMLDivElement>(null);

    const resolvedRef = ref || defaultRef;

    return (
      <Flex
        as={motion.div}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        ref={resolvedRef}
      >
        <IconButton
          aria-label="Compartir"
          icon={<CIcon icon={icons.riShareLine} />}
          size="sm"
          variant="link"
          onClick={() => toggleOpen()}
          {...rest}
        />

        <SharedButtonGroup {...{ url }} />
      </Flex>
    );
  }
);

SharedButton.displayName = "SharedButton";

export { SharedButton };
