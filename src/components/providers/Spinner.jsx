export default function Spinner() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
      <div className="relative w-12 h-12">
        {/* Background ring */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-800" />
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-600 animate-spin" />
      </div>
    </div>
  );
}