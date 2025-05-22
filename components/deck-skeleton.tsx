import { Skeleton } from "@/components/ui/skeleton";

export function DeckSkeleton() {
  return (
    <div className="w-full space-y-5">
      <div className="text-center space-y-1">
        <Skeleton className="h-5 w-52 mx-auto" />
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-5 w-12 mx-auto" />

        {/*
        <Skeleton className="h-44 w-80 mx-auto" />
        */}

      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-[9/12.5] rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}