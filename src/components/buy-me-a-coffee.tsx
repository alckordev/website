import { Box, Button, Flex, Text, Title } from "@mantine/core";
import { RiDrinksLine } from "@remixicon/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const BuyMeACoffee = () => {
  const t = useTranslations();

  return (
    <Box p="24 0 36" mb={24}>
      <Title mb={12} order={3}>
        {t("buy_me_a_coffee_title")}
      </Title>
      <Flex direction={{ base: "column", sm: "row" }} align="center">
        <Box pe={{ sm: 32 }} pb={{ base: 24, sm: 0 }}>
          <Text>{t("buy_me_a_coffee_description")}</Text>
        </Box>
        <Box flex={1}>
          <Button
            component={Link}
            href="https://buymeacoffee.com/alckordevd"
            target="_blank"
            variant="gradient"
            gradient={{ from: "yellow", to: "orange", deg: 90 }}
            leftSection={<RiDrinksLine size={20} />}
          >
            {t("buy_me_a_coffee")}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
