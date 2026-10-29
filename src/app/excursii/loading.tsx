export default function ExcursiiLoading() {
  return (
    <div className="min-h-screen bg-white pb-16 animate-pulse">
      {/* Skeleton Hero */}
      <div className="h-40 w-full bg-[#F7F7F7]" />

      <div className="container-fluid py-8">
        <div className="flex items-start gap-8 lg:gap-10">
          {/* Skeleton Sidebar */}
          <div className="hidden lg:block w-72 2xl:w-80 flex-shrink-0">
            <div className="h-[600px] w-full rounded-lg bg-[#F7F7F7] border-0 p-5 space-y-6">
              <div className="h-6 w-3/4 rounded bg-[#E6E6E6]" />
              <div className="h-10 w-full rounded bg-white" />
              <div className="space-y-3 pt-4">
                <div className="h-4 w-1/2 rounded bg-[#E6E6E6]" />
                <div className="h-4 w-3/4 rounded bg-white" />
                <div className="h-4 w-2/3 rounded bg-white" />
                <div className="h-4 w-4/5 rounded bg-white" />
              </div>
            </div>
          </div>

          {/* Skeleton Content */}
          <div className="flex-1 min-w-0">
            {/* Topbar skeleton */}
            <div className="mb-6 flex items-center justify-between pb-4">
              <div className="h-6 w-36 rounded bg-[#F7F7F7]" />
              <div className="h-10 w-44 rounded-lg bg-[#F7F7F7]" />
            </div>

            {/* Grid skeleton */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex flex-col overflow-hidden rounded-lg border-0 bg-white p-0"
                >
                  <div className="aspect-[16/10] w-full rounded-lg bg-[#F7F7F7]" />
                  <div className="pt-3.5 space-y-2.5">
                    <div className="h-3 w-1/3 rounded bg-[#F7F7F7]" />
                    <div className="h-5 w-3/4 rounded bg-[#F7F7F7]" />
                    <div className="h-4 w-1/2 rounded bg-[#F7F7F7]" />
                    <div className="flex justify-between items-center pt-2">
                      <div className="h-4 w-24 rounded bg-[#F7F7F7]" />
                      <div className="h-4 w-16 rounded bg-[#F7F7F7]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
