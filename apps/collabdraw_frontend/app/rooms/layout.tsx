import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Rooms",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
