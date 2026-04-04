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
      <h1 className="sr-only">
        Mukesh Murugaiyan (themukesh) – Full Stack Developer & Software Engineer
      </h1>

      <p className="sr-only">
        Mukesh Murugaiyan, professionally known as themukesh, is a leading Full
        Stack Software Developer from India. He specializes in building scalable,
        high-performance web and mobile applications using React, Next.js, and
        React Native. Explore his portfolio at themukesh.com.
      </p>

      <HomePageClient />
    </>
  );
}
