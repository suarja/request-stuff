import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function useHandleFolderState(name: string) {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(() => searchParams.get(name) === "true");
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const isInUrl = searchParams.has(name);
    if (!isInUrl) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set(name, open.toString());
      router.replace(`${pathName}?`);
    }
  }, []);

  function handleToggle() {
    const isOpen = searchParams.get(name) === "true";
    setOpen(!isOpen);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(name, (!isOpen).toString());
    router.replace(`
      ${pathName}?${newParams.toString()}`);
  }
  return { open, setOpen, handleToggle };
}
