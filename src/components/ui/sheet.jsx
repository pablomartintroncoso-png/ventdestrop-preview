"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

const SheetContext = createContext(null);

function useSheetContext() {
  const ctx = useContext(SheetContext);
  if (!ctx) {
    throw new Error("Sheet components must be used inside <Sheet>");
  }
  return ctx;
}

export function Sheet({ children }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <SheetContext.Provider value={value}>{children}</SheetContext.Provider>
  );
}

export function SheetTrigger({ asChild, children }) {
  const { setOpen } = useSheetContext();

  const handleClick = (event) => {
    if (React.isValidElement(children) && children.props.onClick) {
      children.props.onClick(event);
    }
    setOpen(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: handleClick });
  }

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
}

export function SheetClose({ asChild, children }) {
  const { setOpen } = useSheetContext();

  const handleClick = (event) => {
    if (React.isValidElement(children) && children.props.onClick) {
      children.props.onClick(event);
    }
    setOpen(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { onClick: handleClick });
  }

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
}

export function SheetContent({ side = "right", className = "", children, ...props }) {
  const { open } = useSheetContext();

  if (!open) return null;

  const justify = side === "left" ? "justify-start" : "justify-end";

  return (
    <div className={`fixed inset-0 z-[80] flex bg-white ${justify}`}>
      <div
        className={
          "h-full w-full max-w-xs bg-white shadow-xl border-slate-200 border-l p-4 " +
          className
        }
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

export default Sheet;
