import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function useHandleFolderState() {
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(
    () => searchParams.get("Requests") === "true"
  );
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("Requests", "false");
    router.replace(`${pathName}?${newParams.toString()}`);
  }, []);

  function handleToggle() {
    const isOpen = searchParams.get("Requests") === "true";
    setOpen(!isOpen);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("Requests", (!isOpen).toString());
    router.replace(`
      ${pathName}?${newParams.toString()}`);
  }
  return { open, setOpen, handleToggle };
}
