export default function LoadingFeed() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="mx-4 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-white/70" />
          <h2 className="font-semibold text-white text-xl">
            Fetching your personalized music feed...
          </h2>
          <p className="text-sm text-white/60">This won't take long</p>
        </div>
      </div>
    </div>
  );
}
