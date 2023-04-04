import { ButtonGroup, IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { motion, Variants } from "framer-motion";
import copy from "copy-to-clipboard";
import { fbButton, tw, linkedin, whatsapp } from "vanilla-sharing";
import CIcon from "@coreui/icons-react";
import { icons } from "../../icons";

const variants: Variants = {
  open: {
    x: 0,
    opacity: 1,
    visibility: "visible",
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: -50,
    opacity: 0,
    visibility: "hidden",
    transition: {
      x: { stiffness: 1000 },
    },
  },
};

export const SharedButtonGroup = ({ ...rest }) => {
  const toast = useToast({ position: "top" });

  const handleCopyToClipboard = () => {
    copy(rest.url);
    toast({ description: "Enlace copiado." });
  };

  return (
    <ButtonGroup
      as={motion.div}
      variants={{
        open: {
          width: "auto",
          paddingLeft: ".5rem",
          transition: { staggerChildren: 0.07, delayChildren: 0.2 },
        },
        closed: {
          width: 0,
          paddingLeft: 0,
          transition: { staggerChildren: 0.05, staggerDirection: -1 },
        },
      }}
      size="xs"
    >
      <IconButton
        as={motion.button}
        variants={variants}
        whileTap={{ scale: 0.95 }}
        aria-label="Compartir en facebook"
        icon={<CIcon icon={icons.riFacebookLine} />}
        colorScheme="facebook"
        rounded="full"
        onClick={() => fbButton({ url: rest.url })}
      />
      <IconButton
        as={motion.button}
        variants={variants}
        whileTap={{ scale: 0.95 }}
        aria-label="Compartir en twitter"
        icon={<CIcon icon={icons.riTwitterLine} />}
        colorScheme="twitter"
        rounded="full"
        onClick={() => tw({ url: rest.url })}
      />
      <IconButton
        as={motion.button}
        variants={variants}
        whileTap={{ scale: 0.95 }}
        aria-label="Compartir en linkedin"
        icon={<CIcon icon={icons.riLinkedinLine} />}
        colorScheme="linkedin"
        rounded="full"
        onClick={() => linkedin({ url: rest.url })}
      />
      <IconButton
        as={motion.button}
        variants={variants}
        whileTap={{ scale: 0.95 }}
        aria-label="Compartir en whatsapp"
        icon={<CIcon icon={icons.riWhatsappLine} />}
        colorScheme="whatsapp"
        rounded="full"
        onClick={() => whatsapp({ url: rest.url })}
      />
      <Tooltip hasArrow label="Haz clic para copiar el enlace">
        <IconButton
          as={motion.button}
          variants={variants}
          whileTap={{ scale: 0.95 }}
          aria-label="Copiar enlace"
          icon={<CIcon icon={icons.riLinkLine} />}
          rounded="full"
          onClick={handleCopyToClipboard}
        />
      </Tooltip>
    </ButtonGroup>
  );
};
