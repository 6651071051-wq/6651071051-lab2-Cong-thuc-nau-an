export default function Skeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl bg-white ring-1 ring-stone-200" aria-hidden="true">
      <div className="aspect-[4/3] bg-stone-200" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-3/4 rounded bg-stone-200" />
        <div className="h-4 w-1/2 rounded bg-stone-200" />
      </div>
    </div>
  );
}
