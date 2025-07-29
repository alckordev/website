import { Checkbox } from "@mantine/core";

export default Checkbox.extend({
  styles: (_, props) => {
    if (props.variant === "filled") {
      return {
        inner: {
          marginTop: 2,
        },
        input: {
          borderColor: "var(--checkbox-bd)",
          backgroundColor: "var(--checkbox-color)",
        },
      };
    }

    return {};
  },
  vars: (theme, props) => {
    if (props.variant === "filled") {
      return {
        root: {
          "--checkbox-color": props.checked
            ? theme.colors["slate"][7]
            : theme.colors["slate"][8],
          "--checkbox-bd": theme.colors["slate"][7],
        },
      };
    }

    return {
      root: {},
    };
  },
  defaultProps: {
    variant: "filled",
  },
});
