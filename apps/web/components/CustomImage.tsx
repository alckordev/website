// import Image, { ImageProps } from "next/image";
import { UI } from "@myth/ui";

export const CustomImage = (props: any) => {
  return (
    <UI.Box my={8}>
      <UI.Image src={props.src} alt={props.alt} rounded="md" boxShadow="md" />
      {props.caption && (
        <UI.Text
          as="em"
          display="block"
          fontSize="sm"
          color="whiteAlpha.700"
          mt={4}
        >
          {props.caption}
        </UI.Text>
      )}
    </UI.Box>
  );
};
