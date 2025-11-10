import { Link } from "react-router";

const Logo = () => {
  return (
    <>
      <Link
        to="/"
        className="text-2xl md:text-3xl font-extrabold primary_linear bg-clip-text text-transparent font-[Raleway]"
      >
        Labora
      </Link>
    </>
  );
};

export default Logo;
