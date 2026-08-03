import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Field = ({ children, className = "" }) => (
  <div className={`space-y-1.5 ${className}`}>{children}</div>
);

const FieldLabel = ({ children, className = "", required = false }) => (
  <Label className={cn("text-sm font-medium", className)}>
    {children}
    {required && <span className="ml-0.5 text-destructive">*</span>}
  </Label>
);

const FieldInput = forwardRef(({ className = "", error, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      error && "border-destructive focus-visible:ring-destructive",
      className,
    )}
    {...props}
  />
));
FieldInput.displayName = "FieldInput";

const FieldTextarea = forwardRef(({ className = "", error, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-20 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background",
      "placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      error && "border-destructive focus-visible:ring-destructive",
      className,
    )}
    {...props}
  />
));
FieldTextarea.displayName = "FieldTextarea";

const FieldSelect = forwardRef(
  ({ children, className = "", error, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-destructive focus-visible:ring-destructive",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  ),
);
FieldSelect.displayName = "FieldSelect";

const FieldError = ({ error }) => {
  if (!error?.message) return null;
  return <p className="text-xs text-destructive">{error.message}</p>;
};

export {
  Field,
  FieldError,
  FieldInput,
  FieldLabel,
  FieldSelect,
  FieldTextarea,
};
