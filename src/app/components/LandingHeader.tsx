import PaperclipIcon from "@/common/icons/PaperClipIcon";
import Link from "next/link";

export default function LandingHeader() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
      <Link className="flex items-center" href="#">
        <PaperclipIcon className="h-6 w-6" />
        <span className="ml-2 text-lg font-medium">RequestStuff</span>
      </Link>
      <nav className="hidden lg:flex gap-6">
        <Link className="text-sm font-medium hover:underline" href="#">
          Features
        </Link>
        <Link className="text-sm font-medium hover:underline" href="#">
          Pricing
        </Link>
        <Link className="text-sm font-medium hover:underline" href="#">
          Contact
        </Link>
      </nav>
      <Link href={"/admin"}>Get Started</Link>
    </header>
  );
}
