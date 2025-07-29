import { alpha, Divider } from "@mantine/core";

export default Divider.extend({
  defaultProps: {
    color: alpha("var(--mantine-color-dark-7)", 0.3),
  },
});
