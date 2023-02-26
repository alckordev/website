import { Link, Text } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
  to: string;
}

export const NavBarItem = ({ children, to, ...rest }: Props) => {
  return (
    <Link href={to} display="block">
      <Text color="white" lineHeight="1.6" fontSize="16px" py={3} {...rest}>
        {children}
      </Text>
    </Link>
  );
};
