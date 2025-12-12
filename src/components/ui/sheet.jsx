import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const SheetCtx = createContext(null);

function useSheet() {
  const ctx = useContext(SheetCtx);
  if (!ctx) throw new Error("Sheet components must be used inside <Sheet>");
  return ctx;
}

export function Sheet({ children }) {
  const [open, setOpen] = useState(false);

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

export function SheetContent({ side = "right", className = "", children, ...props }) {
  const { open, setOpen } = useSheet();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  if (!open) return null;

  const sidePos = side === "left" ? "left-0 border-r" : "right-0 border-l";

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div
        className={`fixed inset-y-0 ${sidePos} z-[60] w-full max-w-full md:max-w-md bg-white opacity-100 shadow-xl border-slate-200 ${className}`}
        style={{ backgroundColor: "#ffffff", opacity: 1 }}
        {...props}
      >
        {children}
      </div>
    </>
  );
}
