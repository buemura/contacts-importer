import React from "react";
import { Navbar } from "../Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar />
      <div className="w-screen h-screen bg-neutral-200">{children}</div>
    </div>
  );
}
