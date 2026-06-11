export default function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="status"
      className="fixed left-1/2 top-5 z-[70] -translate-x-1/2 animate-toast-in rounded-full border border-white/10 bg-zinc-900/90 px-4 py-2 text-sm font-medium text-zinc-100 shadow-xl shadow-black/40 backdrop-blur"
    >
      {message}
    </div>
  );
}
