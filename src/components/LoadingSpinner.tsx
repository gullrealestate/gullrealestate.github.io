export default function LoadingSpinner() {
    return (
        <div className="min-h-screen bg-gruvbox-bg0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-gruvbox-bg2 border-t-gruvbox-blue rounded-full animate-spin" />
                <p className="text-gruvbox-fg/50 text-sm font-medium animate-pulse">Loading…</p>
            </div>
        </div>
    );
}
