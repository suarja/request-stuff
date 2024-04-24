import PaperclipIcon from "@/common/icons/PaperClipIcon";
import Link from "next/link";


export default function LandingFooter() {
    return (
      <footer className="w-full bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center">
            <PaperclipIcon className="h-6 w-6" />
            <span className="ml-2 text-lg font-medium">RequestStuff</span>
          </div>
          <nav className="flex gap-6 mt-4 md:mt-0">
            <Link className="text-sm font-medium hover:underline" href="#">
              Terms
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              Privacy
            </Link>
            <Link className="text-sm font-medium hover:underline" href="#">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    );
}