export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-ds-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Architectural spinner: two concentric rings */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border border-ds-primary/20 rounded-full" />
          <div className="absolute inset-0 border-t border-ds-primary rounded-full animate-spin" />
        </div>
        <p className="text-ds-on-faint text-xs font-headline font-bold uppercase tracking-[0.3em] animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
}
