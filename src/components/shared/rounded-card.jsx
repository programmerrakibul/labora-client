const RoundedCard = ({ children, className = "" }) => {
  return (
    <div
      className={`rounded-2xl border bg-card p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default RoundedCard;
