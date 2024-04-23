"use client";
import { ModeToggle } from "@/common/components/ModeToggle";
import { Nav } from "@/common/components/Nav";
import { useAuthMiddleware } from "@/context/useAuthMiddleware";
import Link from "next/link";

function Page(): JSX.Element {
  useAuthMiddleware();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Nav />
    </main>
  );
}

export default Page;
