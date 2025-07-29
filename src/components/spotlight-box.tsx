import React from "react";
import { alpha, Button, Group, Text } from "@mantine/core";
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";
import { RiSearchLine } from "@remixicon/react";
import { useTranslations } from "next-intl";

export const SpotlightBox = () => {
  const t = useTranslations();

  return (
    <React.Fragment>
      <Button variant="light" onClick={spotlight.open}>
        <Group gap="xs">
          <RiSearchLine size={16} />
          <Text pe={80} c="dimmed" fz="sm">
            {t("search")}
          </Text>
          <Text
            c="dark.0"
            bd="1 solid dark.9"
            bg={alpha("var(--mantine-color-dark-9)", 0.7)}
            p="4 7"
            bdrs="sm"
            fz={11}
            lh={1}
            fw={700}
          >
            Ctrl + K
          </Text>
        </Group>
      </Button>
      <Spotlight
        shortcut={["ctrl + K", "mod + K"]}
        actions={actions}
        nothingFound={`${t("nothing_found")}...`}
        highlightQuery
        limit={7}
        radius="md"
        searchProps={{
          leftSection: <RiSearchLine size={20} />,
          placeholder: `${t("search")}...`,
          name: "search",
          size: "md",
        }}
      />
    </React.Fragment>
  );
};

const actions: SpotlightActionData[] = [
  {
    id: "home",
    label: "Home",
    description: "Get to home page",
    onClick: () => console.log("Home"),
    // leftSection: <IconHome size={24} stroke={1.5} />,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Get full information about current system status",
    onClick: () => console.log("Dashboard"),
    // leftSection: <IconDashboard size={24} stroke={1.5} />,
  },
  {
    id: "documentation",
    label: "Documentation",
    description: "Visit documentation to lean more about all features",
    onClick: () => console.log("Documentation"),
    // leftSection: <IconFileText size={24} stroke={1.5} />,
  },
];
