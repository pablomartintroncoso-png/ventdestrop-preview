"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

// --- Context intern per compartir open / setOpen ---
const SheetContext = createContext(null);

function useSheetContext() {
  const ctx = useContext(SheetContext);
  if (!ctx) {
    throw new Error("Sheet components must be used inside <Sheet>");
  }
  return ctx;
}

// --- ROOT ---
function Sheet({ children }) {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({ open, setOpen }),
    [open]
  );

  return (
    <SheetContext.Provider value={value}>
      {children}
    </SheetContext.Provider>
  );
}

// --- TRIGGER ---
function SheetTrigger({ asChild, children }) {
  const { setOpen } = useSheetContext();

  const handleClick = (event) => {
    if (React.isValidElement(children) && children.props.onClick) {
      children.props.onClick(event);
    }
    setOpen(true);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: handleClick,
    });
  }

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
}

// --- CONTENT (con botón de cerrar incorporado) ---
function SheetContent({
  side = "right",
  className = "",
  children,
  ...props
}) {
  const { open, setOpen } = useSheetContext();

  if (!open) return null;

  const sideClasses =
    side === "left"
      ? "left-0 border-r"
      : "right-0 border-l";

  const baseClasses =
    "fixed inset-y-0 z-50 w-full max-w-xs bg-white shadow-xl p-4 border-slate-200 " +
    sideClasses;

  return (
    <div className={`${baseClasses} ${className}`} {...props}>
      {/* Botón de cerrar propio del Sheet */}
      <div className="flex justify-end mb-4">
        <button
          type="button"
          className="text-sm text-slate-600"
          onClick={() => setOpen(false)}
        >
          Tancar
        </button>
      </div>

      {children}
    </div>
  );
}

// 🔹 SOLO exportamos estos tres
export { Sheet, SheetTrigger, SheetContent };
export default Sheet;
