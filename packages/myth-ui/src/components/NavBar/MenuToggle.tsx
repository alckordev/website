import { Box } from "@chakra-ui/react";
import CIcon from "@coreui/icons-react";
import { riMenuLine, riCloseLine } from "../../icons";

interface Props {
  toggle(): void;
  isOpen: boolean;
}

export const MenuToggle = ({ toggle, isOpen }: Props) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CIcon icon={riCloseLine} /> : <CIcon icon={riMenuLine} />}
    </Box>
  );
};
