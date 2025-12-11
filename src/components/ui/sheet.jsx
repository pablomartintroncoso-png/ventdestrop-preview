"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

// --- contexto interno ---
const SheetContext = createContext(null);

function useSheetContext() {
  const ctx = useContext(SheetContext);
  if (!ctx) {
    throw new Error("Sheet components must be used inside <Sheet>");
  }
  return ctx;
}

// --- ROOT ---
export function Sheet({ children }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <SheetContext.Provider value={value}>
      {children}
    </SheetContext.Provider>
  );
}

// --- TRIGGER ---
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

// --- CLOSE ---
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

// --- CONTENT (panel del menú móvil) ---
export function SheetContent({
  side = "right",
  className = "",
  children,
  ...props
}) {
  const { open, setOpen } = useSheetContext();

  if (!open) return null;

  const justify = side === "left" ? "justify-start" : "justify-end";

  return (
    <div className={`fixed inset-0 z-50 flex ${justify}`}>
      {/* Fondo blanco sólido en TODA la pantalla */}
      <div
        className="absolute inset-0 bg-white"
        onClick={() => setOpen(false)}
      />

      {/* Panel lateral */}
      <div
        className={
          "relative h-full w-full max-w-xs bg-white shadow-xl border-slate-200 border-l p-4 " +
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
