"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

// Root + triggers
const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;

const SheetPortal = (props) => (
  <SheetPrimitive.Portal {...props} />
);

const SheetOverlay = React.forwardRef(function SheetOverlay(
  { className, ...props },
  ref
) {
  return (
    <SheetPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-40 bg-black/40 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
});

const SheetContent = React.forwardRef(function SheetContent(
  { className, side = "right", ...props },
  ref
) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        className={cn(
          "fixed z-50 bg-white shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:duration-200 data-[state=open]:duration-200",
          side === "right" &&
            "inset-y-0 right-0 w-full max-w-xs border-l border-slate-200",
          side === "left" &&
            "inset-y-0 left-0 w-full max-w-xs border-r border-slate-200",
          className
        )}
        {...props}
      />
    </SheetPortal>
  );
});

export { Sheet, SheetTrigger, SheetContent, SheetClose };
