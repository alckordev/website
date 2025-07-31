import { AccountCard } from "@/components/account-card";
import { Aside } from "@/components/layouts";
import { redirect } from "@/i18n/navigation";
import { getUser } from "@/lib/server";
import { Params } from "@/type";
import { Box, Flex, Title } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { getTranslations } from "next-intl/server";

export default async function Page({ params }: { params: Params }) {
  const { locale } = await params;
  const user = await getUser();
  const t = await getTranslations();

  if (!user) redirect({ href: "/blog", locale });

  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      justify="space-evenly"
      mx="-md"
      mih="100%"
    >
      <Box
        flex="1 1 auto"
        maw={{ sm: 728, md: 790 }}
        w="100%"
        mx="auto"
        py={50}
        ps="md"
        pe={{ base: "md", lg: "xl" }}
      >
        <Title order={4} mb="lg" ms={20}>
          {t("my_account")}
        </Title>
        <ModalsProvider>
          <AccountCard user={user!} />
        </ModalsProvider>
      </Box>
      <Aside />
    </Flex>
  );
}
