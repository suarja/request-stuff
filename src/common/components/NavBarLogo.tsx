import Image from "next/image";
import Link from "next/link";
const NavbarLogo = () => {
  return (
    <Link href={"/"} className="flex items-center bg-primary ">
      <Image
        src="/logo.webp"
        alt="RequestStuff Logo"
        className="h-10 mr-3"
        width={40}
        height={10}
      />
      <h1 className="text-lg font-bold text-foreground pr-2">RequestStuff</h1>
    </Link>
  );
};

export default NavbarLogo;
