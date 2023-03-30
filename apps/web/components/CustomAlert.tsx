import { UI } from "@myth/ui";

export const CustomAlert = ({
  type,
  variant = "solid",
  title,
  message,
}: {
  type: "error" | "warning" | "warning" | "info";
  variant?: "subtle" | "solid" | "left-accent" | "top-accent";
  title?: string;
  message: string;
}) => {
  return (
    <UI.Alert status={type} variant={variant} rounded="md">
      <UI.Box>
        {title && <UI.AlertTitle>{title}</UI.AlertTitle>}
        <UI.AlertDescription>{message}</UI.AlertDescription>
      </UI.Box>
    </UI.Alert>
  );
};
