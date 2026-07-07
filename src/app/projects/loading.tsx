export default function ProjectsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 md:py-24 animate-pulse" aria-busy="true" aria-label="Loading projects">
      <div className="mb-14 md:mb-20 space-y-4">
        <div className="h-10 w-48 rounded-lg bg-muted" />
        <div className="h-6 w-full max-w-2xl rounded-lg bg-muted" />
      </div>
      <div className="mb-10 flex flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-10 w-24 rounded-xl bg-muted" />
        ))}
      </div>
      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="aspect-[4/3] rounded-2xl bg-muted" />
        ))}
      </div>
    </div>
  );
}
