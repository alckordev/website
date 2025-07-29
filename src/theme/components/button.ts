import { alpha, Button } from "@mantine/core";

export default Button.extend({
  vars: (theme, props) => {
    if (props.variant === "filled") {
      return {
        root: {
          "--button-bg": theme.colors["brand-blue"][5],
          "--button-hover": alpha(theme.colors["brand-blue"][5], 0.9),
          "--mantine-color-disabled": alpha(theme.colors["brand-blue"][5], 0.5),
          "--mantine-color-disabled-color": alpha("#fff", 0.5),
        },
      };
    }

    if (props.variant === "light") {
      return {
        root: {
          "--button-bg": alpha(theme.colors["slate"][8], 0.5),
          "--button-hover": theme.colors["slate"][8],
          "--button-color": theme.colors["slate"][3],
          "--button-bd": `1px solid ${alpha(theme.colors["slate"][8], 0.7)}`,
        },
      };
    }

    return { root: {} };
  },
  defaultProps: {
    variant: "filled",
  },
});
