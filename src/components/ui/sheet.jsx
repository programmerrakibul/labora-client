import * as React from "react";
import { cn } from "@/lib/utils";

const Sheet = ({ open, onOpenChange, children }) => {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
};

const SheetContext = React.createContext({ open: false, onOpenChange: () => {} });

const SheetTrigger = ({ asChild, children, ...props }) => {
  const { onOpenChange } = React.useContext(SheetContext);
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: (e) => {
        children.props.onClick?.(e);
        onOpenChange(true);
      },
    });
  }
  return <button onClick={() => onOpenChange(true)} {...props}>{children}</button>;
};

const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(SheetContext);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/80" onClick={() => onOpenChange(false)} />
      <div
        ref={ref}
        className={cn(
          "fixed z-50 h-full w-72 bg-background shadow-lg transition-transform",
          side === "right" && "right-0 top-0",
          side === "left" && "left-0 top-0",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </>
  );
});
SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetContent };
