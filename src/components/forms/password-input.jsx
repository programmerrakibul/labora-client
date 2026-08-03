import { Field, FieldError, FieldLabel } from "@/components/forms/form-field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

const PasswordInput = forwardRef(
  (
    { label = "Password", required = false, error, placeholder, className, ...props },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Field className={cn(className)}>
        <FieldLabel required={required}>{label}</FieldLabel>
        <InputGroup className="h-10">
          <InputGroupInput
            ref={ref}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            aria-invalid={Boolean(error)}
            {...props}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              type="button"
              size="icon-sm"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldError error={error} />
      </Field>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
