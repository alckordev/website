import { alpha, MenuDropdown } from "@mantine/core";

export default MenuDropdown.extend({
  defaultProps: {
    bg: "slate.9",
    style: {
      "--popover-border-color": alpha("var(--mantine-color-dark-7)", 0.3),
    },
  },
});
