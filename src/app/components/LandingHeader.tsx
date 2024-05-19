import NavbarLogo from "@/common/components/NavBarLogo";
import { PATHS } from "@/common/constants";
import Link from "next/link";

export default function LandingHeader() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
      <div className="flex items-center">
        <NavbarLogo />
      </div>
      <nav className="hidden lg:flex gap-6">
        <Link className="text-sm font-medium hover:underline" href="#features">
          Features
        </Link>
        <Link className="text-sm font-medium hover:underline" href="#">
          Pricing
        </Link>
        <Link className="text-sm font-medium hover:underline" href="#contact">
          Contact
        </Link>
      </nav>
      <Link
        href={PATHS.DASHBOARD()}
        className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Get Started
      </Link>
    </header>
  );
}
