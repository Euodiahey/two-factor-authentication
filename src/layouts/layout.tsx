import React from "react";

import type { Metadata } from "next";

const title =
  "Novel – Notion-style WYSIWYG editor with AI-powered autocompletions";
const description =
  "Novel is a Notion-style WYSIWYG editor with AI-powered autocompletions. Built with Tiptap, OpenAI, and Vercel AI SDK.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: "summary_large_image",
    creator: "@steventey",
  },
  metadataBase: new URL("https://novel.sh"),
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen flex-col items-center bg-[var(--novel-white)] font-mono sm:px-5 sm:pt-[calc(20vh)]">
      <div className="relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white p-12 px-8 sm:mb-[calc(10vh)] sm:rounded-lg sm:border sm:px-12 sm:shadow-lg">
        {children}
      </div>
    </section>
  );
}
