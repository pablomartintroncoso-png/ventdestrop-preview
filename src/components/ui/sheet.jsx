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

// --- CLOSE ---
function SheetClose({ asChild, children }) {
  const { setOpen } = useSheetContext();

  const handleClick = (event) => {
    if (React.isValidElement(children) && children.props.onClick) {
      children.props.onClick(event);
    }
    setOpen(false);
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

// --- CONTENT (panel + overlay) ---
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

  // z-[60] para estar por encima del header (que está en z-50)
  const panelClasses =
    "fixed inset-y-0 z-[60] w-full max-w-xs bg-white shadow-xl p-4 border-slate-200 " +
    sideClasses +
    " " +
    className;

  return (
    <>
      {/* FONDO OSCURO SOBRE TODO (z-[55] > header z-50) */}
      <div
        className="fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* PANEL */}
      <div className={panelClasses} {...props}>
        {children}
      </div>
    </>
  );
}

export { Sheet, SheetTrigger, SheetClose, SheetContent };
export default Sheet;
