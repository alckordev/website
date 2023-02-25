import React from "react";
import { Link, Text } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
  isLast?: boolean;
  to: string;
}

export const MenuItem = ({ children, isLast, to = "/", ...rest }: Props) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};
