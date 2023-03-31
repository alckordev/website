// import Image, { ImageProps } from "next/image";
import { UI, useColorModeValue } from "@myth/ui";

export const CustomImage = (props: any) => {
  const color = useColorModeValue("blackAlpha.700", "whiteAlpha.700");

  return (
    <UI.Box my={8}>
      <UI.Image src={props.src} alt={props.alt} rounded="md" boxShadow="md" />
      {props.caption && (
        <UI.Text as="em" display="block" fontSize="sm" color={color} mt={4}>
          {props.caption}
        </UI.Text>
      )}
    </UI.Box>
  );
};
