import SmoothImage from "@/components/ui/SmoothImage";
import type { ShowroomPageImage } from "@/lib/shopify/get-showroom-page";

interface ShowroomGalleryProps {
  images: ShowroomPageImage[];
}

type TileVariant = "full" | "wide" | "narrow";

// `sizes` mirror the container width: 100vw (mobile), 86vw (md), 64vw (lg),
// split across the 3-column grid on md+.
const TILE_VARIANTS: Record<TileVariant, { className: string; sizes: string }> =
  {
    full: {
      className: "md:col-span-3 md:aspect-3/1",
      sizes: "(min-width: 1024px) 64vw, (min-width: 768px) 86vw, 100vw",
    },
    wide: {
      className: "md:col-span-2 md:aspect-2/1",
      sizes: "(min-width: 1024px) 43vw, (min-width: 768px) 57vw, 100vw",
    },
    narrow: {
      className: "md:col-span-1 md:aspect-auto md:self-stretch",
      sizes: "(min-width: 1024px) 22vw, (min-width: 768px) 29vw, 100vw",
    },
  };

/**
 * Alternating editorial rhythm on md+: [wide, narrow] / [narrow, wide].
 * A trailing unpaired image spans the full row so the grid never leaves a gap.
 */
function getTileVariant(index: number, total: number): TileVariant {
  const isLastUnpaired = total % 2 !== 0 && index === total - 1;
  if (isLastUnpaired) return "full";

  const position = index % 4;
  return position === 0 || position === 3 ? "wide" : "narrow";
}

export default function ShowroomGallery({ images }: ShowroomGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="mx-auto w-full px-5 pt-4 pb-12 md:w-[86%] md:px-0 md:pt-6 md:pb-16 lg:w-[64%]">
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
        {images.map((image, index) => {
          const variant = TILE_VARIANTS[getTileVariant(index, images.length)];

          return (
            <li
              key={`${image.url}-${index}`}
              className={`relative aspect-4/3 overflow-hidden ${variant.className}`}
            >
              <SmoothImage
                src={image.url}
                alt={image.altText ?? ""}
                fill
                sizes={variant.sizes}
                quality={88}
                loading="lazy"
                className="object-cover object-center"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
