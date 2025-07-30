import { MenuItem } from "@mantine/core";

export default MenuItem.extend({
  defaultProps: {
    sx: (theme) => ({
      "&:hover": {
        backgroundColor: theme.colors["slate"][8],
      },
    }),
  },
});
