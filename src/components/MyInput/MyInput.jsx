const MyInput = ({
  type = "text",
  holder,
  name = "",
  className = "",
  required = true,
  disabled = false,
  defaultValue = "",
  ...props
}) => {
  return (
    <>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={holder}
        className={`input ${className}`}
        disabled={disabled}
        defaultValue={defaultValue}
        required={required}
        {...props}
      />
    </>
  );
};

export default MyInput;
