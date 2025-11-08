const MyInput = ({
  type = "text",
  holder,
  name = "",
  className = "",
  required = true,
  disabled = false,
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
        required={required}
      />
    </>
  );
};

export default MyInput;
