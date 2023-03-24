type CustomElement = {
  type: "heading" | "paragraph" | "link";
  level?: number;
  url?: string;
  children: CustomText[];
};

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

export type { CustomElement, CustomText };
