import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A Personal Note",
  description: "A small digital space created with care, reflection, and sincerity.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PersonalMineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
