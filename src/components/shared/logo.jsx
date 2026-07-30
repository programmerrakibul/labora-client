import { Link } from "react-router";

const Logo = ({ className = "" }) => {
  return (
    <Link to="/" className={`flex items-center gap-2 font-heading text-xl font-bold ${className}`}>
      <span className="text-primary">Labora</span>
    </Link>
  );
};

export default Logo;
