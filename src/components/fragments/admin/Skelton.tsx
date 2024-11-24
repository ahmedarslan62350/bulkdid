import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
  return (
    <div className="flex flex-col h-fit w-full gap-5">
      <Skeleton className="h-10 w-44 rounded-lg gap-3" />
      <Skeleton className="h-56 w-full rounded-lg gap-3" />
      <Skeleton className="h-10 w-44 rounded-lg gap-3" />
      <div className=" flex flex-wrap w-full h-fit gap-2">
        <Skeleton className="h-96 w-[49.6%] rounded-lg" />
        <Skeleton className="h-96 w-[49.6%] rounded-lg" />
        <Skeleton className="h-96 w-[49.6%] rounded-lg" />
        <Skeleton className="h-96 w-[49.6%] rounded-lg" />
      </div>
      <Skeleton className="h-10 w-44 rounded-lg gap-3" />
      <Skeleton className="h-80 w-full rounded-lg" />
      <Skeleton className="h-10 w-44 rounded-lg gap-3" />
      <Skeleton className="h-screen w-full rounded-lg" />
    </div>
  );
}
