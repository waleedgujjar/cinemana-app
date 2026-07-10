export default function BlogLoading() {
  return (
    <main className="section-padding pt-28">
      <div className="section-container animate-pulse">
        <div className="mb-8 h-4 w-48 rounded bg-secondary" />
        <div className="mb-4 h-8 w-64 rounded bg-secondary" />
        <div className="mb-12 h-4 w-96 max-w-full rounded bg-secondary" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card rounded-2xl p-6">
              <div className="mb-4 aspect-[16/9] rounded-xl bg-secondary" />
              <div className="mb-2 h-5 w-3/4 rounded bg-secondary" />
              <div className="h-4 w-full rounded bg-secondary" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
