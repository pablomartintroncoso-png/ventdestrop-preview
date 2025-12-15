import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

const SheetCtx = createContext(null);

function useSheet() {
  const ctx = useContext(SheetCtx);
  if (!ctx) throw new Error("Sheet components must be used inside <Sheet>");
  return ctx;
}

export function Sheet({ children, defaultOpen = false, onOpenChange }) {
  const [open, setOpenState] = useState(defaultOpen);

  const setOpen = (next) => {
    setOpenState(next);
    if (typeof onOpenChange === "function") onOpenChange(next);
  };

  const value = useMemo(() => ({ open, setOpen }), [open]);

  return <SheetCtx.Provider value={value}>{children}</SheetCtx.Provider>;
}

export function SheetTrigger({ asChild, children }) {
  const { setOpen } = useSheet();

  const onClick = (e) => {
    if (React.isValidElement(children) && children.props.onClick) {
      children.props.onClick(e);
    }
    setOpen(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick });
  }

  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export function SheetClose({ asChild, children }) {
  const { setOpen } = useSheet();

  const onClick = (e) => {
    if (React.isValidElement(children) && children.props.onClick) {
      children.props.onClick(e);
    }
    setOpen(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick });
  }

  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export function SheetContent({
  side = "right",
  className = "",
  children,
  ...props
}) {
  const { open, setOpen } = useSheet();

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, setOpen]);

  if (!open) return null;

  const sidePos = side === "left" ? "left-0 border-r" : "right-0 border-l";

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div
        className={[
          "fixed top-0 bottom-0 z-[60]",
          "w-full max-w-full md:max-w-md",
          "shadow-xl outline-none overflow-y-auto",
          "border-slate-200",
          sidePos,
          className,
        ].join(" ")}
        style={{ backgroundColor: "#ffffff", opacity: 1 }}
        {...props}
      >
        {children}
      </div>
    </>,
    document.body
  );
}
