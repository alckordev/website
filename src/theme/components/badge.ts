import { Badge } from "@mantine/core";

export default Badge.extend({
  defaultProps: {
    styles: (theme, props) => {
      const size = props.size || "md";

      return {
        root: {
          cursor: "pointer",
          lineHeight: theme.lineHeights[size],
        },
      };
    },
  },
});
