import { cn } from "@/lib/utils";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function ActionButton({
  children,
  onClick,
  className,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 backdrop-blur-sm transition-all duration-200 hover:cursor-pointer hover:border-white/20 hover:bg-white/15 hover:text-white/90 active:scale-95",
        className,
      )}
    >
      {children}
    </button>
  );
}
