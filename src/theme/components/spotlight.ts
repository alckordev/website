import { alpha } from "@mantine/core";
import { Spotlight } from "@mantine/spotlight";

export default Spotlight.extend({
  styles: (theme) => ({
    actionsList: {
      borderColor: alpha("var(--mantine-color-dark-7)", 0.5),
    },
    action: {
      borderRadius: theme.radius.md,
    },
  }),
});
