import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logoMark from "@/assets/brand/afristory-logo.png";

type BrandLogoProps = {
  className?: string;
  detail?: boolean;
  href?: string | null;
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
};

const MARK_SIZES = {
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-14 w-14",
} as const;

export function BrandLogo({
  className = "",
  detail = false,
  href = "/",
  size = "md",
  tone = "light",
}: BrandLogoProps) {
  const mark = (
    <span
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-[1.15rem] border shadow-sm",
        MARK_SIZES[size],
        tone === "dark" ? "border-white/10 bg-dark-surface" : "border-border bg-bg",
      )}
    >
      <img
        src={logoMark}
        alt=""
        className="h-full w-full object-cover"
        loading="eager"
        decoding="async"
      />
    </span>
  );

  const wordmark = (
    <span className="flex flex-col leading-none">
      <span
        className={cn(
          "font-serif text-[1.15rem] font-semibold tracking-tight md:text-[1.35rem]",
          tone === "dark" ? "text-on-dark" : "text-text",
        )}
      >
        AfriStory{" "}
        <span className={cn("italic", tone === "dark" ? "text-gold" : "text-green")}>JOJ</span>
      </span>
      {detail && (
        <span
          className={cn(
            "mt-1 text-[0.64rem] uppercase tracking-[0.24em]",
            tone === "dark" ? "text-on-dark-muted" : "text-text-muted",
          )}
        >
          Musée vivant de l'athlétisme
        </span>
      )}
    </span>
  );

  const content = (
    <>
      {mark}
      {wordmark}
    </>
  );

  if (href === null) {
    return <div className={cn("inline-flex items-center gap-3", className)}>{content}</div>;
  }

  return (
    <Link
      to={href}
      className={cn(
        "group inline-flex items-center gap-3 transition-transform hover:-translate-y-0.5",
        className,
      )}
    >
      {content}
    </Link>
  );
}
