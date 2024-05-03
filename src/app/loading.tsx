import { Skeleton } from "@/common/components/ui/skeleton";

export default async function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
