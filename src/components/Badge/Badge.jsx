const Badge = ({ children, className = "" }) => {
  return (
    <>
      <span className={`badge badge-primary text-white dark:badge-secondary ${className}`}>{children}</span>
    </>
  );
};

export default Badge;
