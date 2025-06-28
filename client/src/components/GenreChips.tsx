interface GenreChipsProps {
  genres: string[];
}
export default function GenreChips({ genres }: GenreChipsProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {genres.slice(0, 3).map(genre => (
        <span
          key={genre}
          className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-white/70 text-xs backdrop-blur-sm"
        >
          #{genre}
        </span>
      ))}
    </div>
  );
}
