import { forwardRef } from "react";
import { MantineLoaderComponent } from "@mantine/core";

export const InfinityLoader: MantineLoaderComponent = forwardRef(
  ({ style, ...others }, ref) => (
    <svg
      {...others}
      ref={ref}
      style={{
        width: "var(--loader-size)",
        height: "var(--loader-size)",
        stroke: "var(--loader-color)",
        ...style,
      }}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#fff"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="10"
        strokeDasharray="205.271 51.318"
        d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
        strokeLinecap="round"
      >
        <animate
          attributeName="stroke-dashoffset"
          repeatCount="indefinite"
          dur="2s"
          keyTimes="0;1"
          values="0;256.589"
        />
      </path>
    </svg>
  )
);

InfinityLoader.displayName = "InfinityLoader";
