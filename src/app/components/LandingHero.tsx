import { Button } from "@/common/components/ui/button";
import PaperclipIcon from "@/common/icons/PaperClipIcon";
import Image from "next/image";
import Link from "next/link";

export default function LandingHero() {
  return (
    <section
      id="hero"
      className="w-full py-20 md:py-32 bg-gray-50 dark:bg-primary"
    >
      <div className="container px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Simplify File Requests with RequestStuff
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-md">
            Create unique, secure links to request files from others. Easily
            fulfill requests and share files through our intuitive platform.
          </p>
          <div className="flex gap-4">
            <Button variant="default">Get Started</Button>
            <Button variant="secondary">Learn More</Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            priority
            alt="RequestStuff Hero Image"
            className="rounded-lg"
            height="400"
            src="/hero.webp"
            style={{
              aspectRatio: "600/400",
              objectFit: "cover",
            }}
            width="600"
          />
        </div>
      </div>
    </section>
  );
}
