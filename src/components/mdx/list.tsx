import { ListProps, List as MantineList, ThemeIcon } from "@mantine/core";
import { RiCheckLine } from "@remixicon/react";

export const List = (props: ListProps) => {
  return (
    <MantineList
      icon={
        <ThemeIcon variant="light" size={24} radius="xl">
          <RiCheckLine size={16} />
        </ThemeIcon>
      }
      spacing="xs"
      styles={{
        itemWrapper: {
          "--li-align": "flex-start",
        },
      }}
      {...props}
    />
  );
};
