interface InteractionPromptProps {
  onInteract: () => void;
}

export default function PromptInteraction({
  onInteract,
}: InteractionPromptProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="mx-4 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-sm">
        <h2 className="mb-3 font-semibold text-white text-xl">
          Ready to discover music?
        </h2>

        <p className="mb-6 text-gray-300 text-sm leading-relaxed">
          Due to browser limitations, we need your permission to play audio. Tap
          the button below to start your music journey!
        </p>

        <button
          type="button"
          onClick={onInteract}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3 font-semibold text-white text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/15 hover:text-white/90 active:scale-95"
        >
          Start Listening
        </button>
      </div>
    </div>
  );
}
