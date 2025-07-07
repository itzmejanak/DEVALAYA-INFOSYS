import { Skeleton } from "@/components/ui/skeleton"

export default function ServicesLoading() {
  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <Skeleton className="h-12 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
      </div>

      {/* Category Tabs Skeleton */}
      <div className="flex justify-center mb-16">
        <Skeleton className="h-10 w-full max-w-3xl mx-auto" />
      </div>

      {/* Services Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array(6).fill(0).map((_, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <Skeleton className="w-12 h-12 rounded-lg mb-4" />
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-6" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-10 w-full mt-4" />
          </div>
        ))}
      </div>

      {/* Call to Action Skeleton */}
      <div className="rounded-xl p-8 md:p-12 text-center mt-16 bg-gray-100">
        <Skeleton className="h-8 w-64 mx-auto mb-4" />
        <Skeleton className="h-4 w-full max-w-3xl mx-auto mb-2" />
        <Skeleton className="h-4 w-full max-w-2xl mx-auto mb-8" />
        <Skeleton className="h-12 w-40 mx-auto" />
      </div>
    </div>
  )
}