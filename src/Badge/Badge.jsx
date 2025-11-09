const Badge = ({ children, className = "" }) => {
  return (
    <>
      <span className={`badge badge-primary ${className}`}>{children}</span>
    </>
  );
};

export default Badge;
