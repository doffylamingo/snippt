import { cn } from "@/lib/utils";

interface AlbumCoverProps {
  src: string;
  alt: string;
  className?: string;
}

export default function AlbumCover({ src, alt, className }: AlbumCoverProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-square w-full max-w-2xs items-center justify-center",
        className,
      )}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent blur-md" />
      <img
        src={src}
        alt={alt}
        className="relative h-70 rounded-2xl border border-white/10 object-cover shadow-2xl"
      />
    </div>
  );
}
