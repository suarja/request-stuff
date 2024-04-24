import { ModeToggle } from "./ModeToggle";
import NavbarLogo from "./NavBarLogo";
import { Button } from "@/common/components/ui/button";
import signOutUser from "@/firebase/auth/sign-out";

export function Nav() {
  return (
    <nav className="z-10 h-full  w-full max-w-5xl items-center md:justify-between font-mono text-sm ">
      <div className="fixed left-0 top-0 md:h-full flex w-full gap-4 justify-center  lg:justify-between border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <NavbarLogo />
        <div className="flex gap-2">
          <Button
            onClick={() => {
              signOutUser();
            }}
            variant="outline"
          >
            Sign Out
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
