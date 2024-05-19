import { Skeleton } from "./ui/skeleton";

export default function LoadingSkeletonPage() {
  return (
    <div className="flex flex-col ml-8 justify-between mx-auto items-center py-4 h-screen">
      <Skeleton className="h-10 w-[80%] mt-2 bg-gray-800" />
      <div>
        <Skeleton className="h-[45%] w-[80%] rounded-xl bg-gray-800" />
      </div>
      <Skeleton className="h-[1.5%] w-[80%] rounded-xl bg-gray-800" />
      <Skeleton className="h-[1.5%] w-[80%] rounded-xl bg-gray-800" />
      <div className="flex  items-center space-x-4 ">
        <Skeleton className="h-12 w-12 rounded-full bg-gray-800" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-gray-800" />
          <Skeleton className="h-4 w-[200px] bg-gray-800" />
        </div>
      </div>

      <Skeleton className="h-[1.5%] w-[80%] rounded-xl bg-gray-800" />
      <Skeleton className="h-[1.5%] w-[80%] rounded-xl bg-gray-800" />
      <Skeleton className="h-[1.5%] w-[80%] rounded-xl bg-gray-800" />
      <Skeleton className="h-[10.5%] w-[50%] rounded-full bg-gray-800" />
      <Skeleton className="h-[1.5%] w-[80%] rounded-xl bg-gray-800" />
      <Skeleton className="h-[1.5%] w-[80%] rounded-xl bg-gray-800" />

      <Skeleton className="h-[1.5%] w-[80%] rounded-xl bg-gray-800" />
      <Skeleton className="h-[1.5%] w-[80%] rounded-xl bg-gray-800" />
      <Skeleton className="h-[1.5%] w-[80%] rounded-xl bg-gray-800" />
      <Skeleton className="h-[1.5%] w-[80%] rounded-xl bg-gray-800" />
      <div className="grid grid-cols-2">
        <div className="flex  items-end justify-center space-x-4 ">
          <Skeleton className="h-12 w-12 rounded-full bg-gray-800" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-gray-800" />
            <Skeleton className="h-4 w-[200px] bg-gray-800" />
          </div>
        </div>
      </div>
      <div className="flex  items-end justify-center space-x-4 ">
        <Skeleton className="h-12 w-12 rounded-full bg-gray-800" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] bg-gray-800" />
          <Skeleton className="h-4 w-[200px] bg-gray-800" />
        </div>
      </div>
      <Skeleton className="h-[1.5%] w-[80%] rounded-xl bg-gray-800" />
    </div>
  );
}
