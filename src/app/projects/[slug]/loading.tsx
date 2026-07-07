export default function ProjectDetailLoading() {
  return (
    <div className="min-h-screen animate-pulse" aria-busy="true" aria-label="Loading project">
      <div className="h-[50vh] bg-muted" />
      <div className="mx-auto max-w-4xl px-5 py-16 space-y-6">
        <div className="h-8 w-2/3 rounded-lg bg-muted" />
        <div className="h-4 w-full rounded-lg bg-muted" />
        <div className="h-4 w-5/6 rounded-lg bg-muted" />
      </div>
    </div>
  );
}
