import { alpha, MenuDivider } from "@mantine/core";

export default MenuDivider.extend({
  defaultProps: {
    __vars: (theme) => ({
      "--border-color": alpha(theme.colors.dark[7], 0.3),
    }),
    style: {
      borderColor: "var(--border-color)",
    },
  },
});
