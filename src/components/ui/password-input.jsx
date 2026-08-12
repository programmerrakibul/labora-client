import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";

const PasswordInput = forwardRef(
  ({ ariaInvalid = false, placeholder, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <InputGroup className="h-8">
        <InputGroupInput
          ref={ref}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          aria-invalid={ariaInvalid}
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
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
