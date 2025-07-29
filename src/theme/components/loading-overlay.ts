import { alpha, LoadingOverlay } from "@mantine/core";

export default LoadingOverlay.extend({
  styles: {
    overlay: {
      "--overlay-bg": alpha("var(--mantine-color-dark-9)", 0.8),
    },
  },
});
