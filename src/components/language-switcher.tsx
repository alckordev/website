"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Button, Menu } from "@mantine/core";
import { RiArrowDropDownLine, RiGlobalLine } from "@remixicon/react";
import { useLocale, useTranslations } from "next-intl";

export const LanguageSwitcher = () => {
  const t = useTranslations();

  const pathname = usePathname();

  const locale = useLocale();

  const otherLocales = routing.locales.filter((l) => l !== locale);

  return (
    <Menu radius="md">
      <Menu.Target>
        <Button
          variant="light"
          size="compact-md"
          leftSection={<RiGlobalLine size={20} />}
          rightSection={<RiArrowDropDownLine size={20} />}
        >
          {t("lang_name", { code: locale })}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {otherLocales.map((l) => (
          <Menu.Item key={l} component={Link} href={pathname} locale={l}>
            {t("lang_name", { code: l })}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
};
