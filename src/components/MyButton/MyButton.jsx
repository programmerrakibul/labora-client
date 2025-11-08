const MyButton = ({ children, onClick, className = "", disabled = false }) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        className={`btn btn-primary ${className}`}
      >
        {children}
      </button>
    </>
  );
};

export default MyButton;
