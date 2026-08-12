import { Controller } from "react-hook-form";
import { Checkbox } from "./checkbox";
import { Field, FieldError, FieldLabel } from "./field";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Textarea } from "./textarea";

const FormField = ({
  type = "text",
  required = false,
  name,
  control,
  label,
  placeholder,
  rows = 4,
  options = [],
  children,
  renderComponent,
  orientation = "vertical",
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => (
        <Field data-invalid={fieldState.invalid} orientation={orientation}>
          {type === "checkbox" && (
            <Checkbox
              {...field}
              id={name}
              aria-invalid={fieldState.invalid}
              orientation={orientation}
            />
          )}

          <FieldLabel htmlFor={name}>
            {label}
            {required && <span className="text-destructive">*</span>}
          </FieldLabel>

          {renderComponent?.({ field, fieldState, formState }) || (
            <>
              {["text", "email", "password", "url"].includes(type) && (
                <Input
                  {...field}
                  id={name}
                  type={type}
                  placeholder={placeholder}
                  aria-invalid={fieldState.invalid}
                />
              )}

              {type === "number" && (
                <Input
                  {...field}
                  id={name}
                  type={type}
                  placeholder={placeholder}
                  aria-invalid={fieldState.invalid}
                />
              )}

              {type === "textarea" && (
                <Textarea
                  {...field}
                  id={name}
                  rows={rows}
                  placeholder={placeholder}
                  aria-invalid={fieldState.invalid}
                />
              )}

              {type === "select" && (
                <Select {...field} onValueChange={field.onChange}>
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    <SelectValue>
                      {(value) =>
                        value
                          ? options.find((option) => option.value === value)
                              ?.label
                          : placeholder
                      }
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent alignItemWithTrigger={false}>
                    <SelectGroup>
                      {children || (
                        <>
                          {label && <SelectLabel>{label}</SelectLabel>}

                          {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </>
                      )}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            </>
          )}

          <FieldError errors={[fieldState.error]} />
        </Field>
      )}
    />
  );
};

export default FormField;
