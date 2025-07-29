import { Loader } from "@mantine/core";
import { InfinityLoader, RingLoader } from "./types";

export default Loader.extend({
  defaultProps: {
    loaders: {
      ...Loader.defaultLoaders,
      ring: RingLoader,
      infinity: InfinityLoader,
    },
    type: "ring",
  },
});
