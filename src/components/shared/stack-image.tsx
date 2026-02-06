import { cn } from "@/lib/utils";
import Image from "next/image";

interface StackedImageProps {
  imageUrl: string;
  colors?: string[];
  className?: string;
  variant?:
    | "default"
    | "background_stack_left_bottom"
    | "background_stack_right";
  stack_background?: string;
  style?: React.CSSProperties;
}

const StackedImage = ({
  imageUrl,
  colors = ["#8B5CF6", "#10B981", "#3B82F6"],
  className = "",
  variant,
  stack_background,
  style,
}: StackedImageProps) => {
  // Tính offset động dựa trên số lượng layers
  const getOffset = (index: number) => {
    const baseOffset = 0.5; // rem
    return (colors.length - index) * baseOffset;
  };

  if (
    variant === "background_stack_left_bottom" ||
    variant === "background_stack_right"
  ) {
    return (
      <div
        className={cn("relative max-lg:-mx-4", className, {
          "max-lg:mb-8": variant === "background_stack_right",
        })}
        style={style}
      >
        {stack_background && (
          <Image
            src={stack_background}
            alt="Stack Background"
            width={600}
            height={600}
            className={cn("w-75% h-full object-cover opacity-50 lg:w-full", {
              "absolute -bottom-1/12 -left-1/3":
                variant === "background_stack_left_bottom",
              "absolute -right-1/3 scale-115":
                variant === "background_stack_right",
            })}
          />
        )}
        {/* Layer image phía trước */}
        <div
          className={cn("relative h-full w-2/3 overflow-hidden lg:size-full", {
            "max-lg:ml-auto": variant === "background_stack_left_bottom",
          })}
          style={{ zIndex: colors.length }}
        >
          <Image
            src={imageUrl}
            width={600}
            height={600}
            alt="Stacked content"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={style}>
      {/* Render các layers stack từ xa đến gần */}
      {colors.map((color, index) => (
        <div
          key={index}
          className="absolute inset-0"
          style={{
            background: color,
            transform: `translate(${getOffset(index)}rem, ${getOffset(index)}rem)`,
            zIndex: index,
          }}
        />
      ))}

      {/* Layer image phía trước */}
      <div
        className="relative size-full overflow-hidden"
        style={{ zIndex: colors.length }}
      >
        <Image
          src={imageUrl}
          width={600}
          height={600}
          alt="Stacked content"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default StackedImage;
