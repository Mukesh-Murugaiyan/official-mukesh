import type { Metadata } from "next";
import HomePageClient from "./Homepage";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <HomePageClient />
    </>
  );
}
