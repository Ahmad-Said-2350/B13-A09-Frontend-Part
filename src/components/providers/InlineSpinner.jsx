
export function InlineSpinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="relative">
        <div className="w-10 h-10 rounded-full border-4 border-slate-200 dark:border-slate-800" />
        <div className="w-10 h-10 rounded-full border-4 border-transparent border-t-violet-600 animate-spin absolute top-0 left-0" />
      </div>
    </div>
  );
}


export function FullPageSpinner() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-4 border-slate-200 dark:border-slate-800" />
        <div className="w-14 h-14 rounded-full border-4 border-transparent border-t-violet-600 animate-spin absolute top-0 left-0" />
        <div className="w-3 h-3 rounded-full bg-violet-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="mt-4 text-xs font-medium text-slate-400 dark:text-slate-500 tracking-widest uppercase">
        Loading...
      </p>
    </div>
  );
}


export default FullPageSpinner;