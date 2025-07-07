import { Skeleton } from "@/components/ui/skeleton"

export default function ServiceDetailLoading() {
  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <Skeleton className="h-8 w-40 mb-6" />
          <Skeleton className="h-12 w-full mb-6" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-3/4 mb-8" />
          <div className="flex flex-wrap gap-3 mb-8">
            {Array(5).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-6 w-20 rounded-full" />
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-14 w-full sm:w-40" />
            <Skeleton className="h-14 w-full sm:w-40" />
          </div>
        </div>
        <Skeleton className="aspect-video lg:aspect-square rounded-xl" />
      </div>

      {/* Features Section Skeleton */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-48 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-6">
              <Skeleton className="w-10 h-10 rounded-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>

      {/* Process Section Skeleton */}
      <div className="mb-20 bg-gray-100 rounded-xl p-8 md:p-12">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-48 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <Skeleton className="w-16 h-16 rounded-full mb-4" />
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>

      {/* Technologies Section Skeleton */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
        </div>

        <div className="mb-8">
          <Skeleton className="h-10 w-full" />
        </div>
        
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>

      {/* Call to Action Skeleton */}
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  )
}