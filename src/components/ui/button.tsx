"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        darkening: "text-black border-2 border-black",
      },
      size: {
        default:
          "h-10 px-4 py-2 bg-opacity-10 hover:bg-opacity-20 active:bg-opacity-30 transition-colors duration-200",
        sm: "h-9 rounded-md px-3 bg-opacity-10 hover:bg-opacity-20 active:bg-opacity-30 transition-colors duration-200",
        lg: "h-11 rounded-md px-8 bg-opacity-10 hover:bg-opacity-20 active:bg-opacity-30 transition-colors duration-200",
        icon: "h-10 w-10 bg-opacity-10 hover:bg-opacity-20 active:bg-opacity-30 transition-colors duration-200",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  maxClicks?: number;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, maxClicks = 10, ...props },
    ref
  ) => {
    const [clickCount, setClickCount] = React.useState(0);
    const Comp = asChild ? Slot : "button";

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant === "darkening") {
        setClickCount((prev) => Math.min(prev + 1, maxClicks));
      }
      props.onClick?.(e);
    };

    // Calculate background color based on click count
    const getBackgroundColor = () => {
      if (variant !== "darkening") return undefined;
      const opacity = (clickCount / maxClicks) * 100;
      return `rgb(${255 - opacity * 2.55}, ${255 - opacity * 2.55}, ${
        255 - opacity * 0.5
      })`;
    };

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        style={{
          ...(variant === "darkening"
            ? {
                backgroundColor: getBackgroundColor(),
                transition: "background-color 0.3s ease",
              }
            : {}),
        }}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
