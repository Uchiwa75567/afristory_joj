type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  ratio?: "square" | "portrait" | "video" | "tall";
  overlay?: boolean;
  loading?: "lazy" | "eager";
};

const RATIOS = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  video: "aspect-video",
  tall: "aspect-[3/4]",
};

export function ImageFrame({
  src,
  alt,
  className = "",
  imgClassName = "",
  ratio = "portrait",
  overlay = true,
  loading = "lazy",
}: Props) {
  return (
    <div className={`relative overflow-hidden bg-surface-2 ${RATIOS[ratio]} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${imgClassName}`}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
