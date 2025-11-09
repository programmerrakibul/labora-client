const MyInput = ({
  type = "text",
  holder,
  name = "",
  className = "",
  required = true,
  disabled = false,
  defaultValue = "",
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
      />
    </>
  );
};

export default MyInput;
