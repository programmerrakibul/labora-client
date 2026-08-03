import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

const SearchInput = ({
  value = "",
  onChange,
  onClear,
  placeholder = "Search...",
  className,
  clearable = true,
  ...props
}) => {
  const handleClear = () => {
    onChange?.("");
    onClear?.();
  };

  return (
    <InputGroup className={cn("h-10", className)}>
      <InputGroupAddon>
        <Search className="size-4" />
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        className="[&::-webkit-search-cancel-button]:hidden"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        {...props}
      />
      {clearable && value ? (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X className="size-3.5" />
          </InputGroupButton>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  );
};

export default SearchInput;
