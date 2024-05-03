import { Skeleton } from "@/common/components/ui/skeleton";

export default async function Page() {
  return (
    <div className="flex flex-col  justify-between h-screen">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
