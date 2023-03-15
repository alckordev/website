type CustomElement = { type: "paragraph"; children: CustomText[] };

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

export type { CustomElement, CustomText };
