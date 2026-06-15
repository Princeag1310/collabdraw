import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drawing Canvas",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
