import { Button, Drawer, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { RiChat1Line } from "@remixicon/react";
import { useTranslations } from "next-intl";
import React from "react";

export const ThreadResponses = ({
  thread,
  locale,
}: {
  thread: string;
  locale: string;
}) => {
  const t = useTranslations();

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <React.Fragment>
      <Button
        variant="transparent"
        c="white"
        size="compact-md"
        px={0}
        leftSection={<RiChat1Line size={20} />}
        onClick={open}
      >
        99
      </Button>

      <Drawer
        opened={opened}
        onClose={close}
        title={`${t("responses")}: 99`}
        position="right"
        overlayProps={{ bg: "transparent" }}
        offset={8}
        radius="lg"
        shadow="xl"
      >
        <Stack>
          <div>Editor</div>
          <div>Comments</div>
        </Stack>
      </Drawer>
    </React.Fragment>
  );
};
