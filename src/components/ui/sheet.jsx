import React from "react";

const SheetContext = React.createContext(null);

function useSheetContext() {
  const ctx = React.useContext(SheetContext);
  if (!ctx) {
    throw new Error("Sheet components must be used inside <Sheet>");
  }
  return ctx;
}

export function Sheet({ children }) {
  const [open, setOpen] = React.useState(false);

  const value = React.useMemo(
    () => ({ open, setOpen }),
    [open]
  );

  return (
    <SheetContext.Provider value={value}>
      {children}
    </SheetContext.Provider>
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
    return React.cloneElement(children, {
      onClick: handleClick,
    });
  }

  return <button onClick={handleClick}>{children}</button>;
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
    return React.cloneElement(children, {
      onClick: handleClick,
    });
  }

  return <button onClick={handleClick}>{children}</button>;
}

export function SheetContent({
  side = "right",
  className = "",
  children,
  ...props
}) {
  const { open } = useSheetContext();

  if (!open) return null;

  const sideClasses =
    side === "left"
      ? "left-0 border-r"
      : "right-0 border-l";

  const classes =
    "fixed inset-y-0 z-50 w-full max-w-full bg-white shadow-xl border-slate-200 p-4 " +
    sideClasses +
    " " +
    className;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}

export default Sheet;

