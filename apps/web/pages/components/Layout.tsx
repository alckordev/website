import React, { Fragment } from "react";
import { UI, Navbar } from "@myth/ui";

interface Props {
  children: React.ReactNode;
  metadata?: {
    date?: string;
  };
  type?: string;
}

export const Layout = ({ children, metadata = {}, type = "post" }: Props) => {
  const isBlogTemplate = type === "post" && metadata.date;

  return (
    <Fragment>
      <Navbar />
      <div>{children}</div>
    </Fragment>
  );
};
