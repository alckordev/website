import { alpha, TextInput } from "@mantine/core";

export default TextInput.extend({
  vars: (theme, props) => {
    if (props.variant === "default") {
      return {
        wrapper: {
          "--input-bd": theme.colors["slate"][7],
          "--input-bg": theme.colors["slate"][8],
          "--input-bd-focus": alpha(theme.colors["brand-blue"][5], 0.5),
        },
      };
    }

    return {
      wrapper: {},
    };
  },
  defaultProps: {
    variant: "default",
  },
});
