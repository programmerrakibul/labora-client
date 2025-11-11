import { useNavigate } from "react-router";
import MyButton from "../../components/MyButton/MyButton";
import img404 from "../../assets/page_not_found.svg";
import img404Dark from "../../assets/page_not_found_dark.png";
import useThemeContext from "../../hooks/useThemeContext";

const ErrorPage = () => {
  const navigate = useNavigate();
  const { theme } = useThemeContext();

  const image = theme === "light" ? img404 : img404Dark;

  return (
    <>
      <title>Page Not Found</title>

      <section className="min-h-dvh w-full grid place-items-center px-5">
        <div className="max-w-md w-full text-center space-y-6">
          <img src={image} alt="Page Not Found" className={`animate-pulse`} />
          <h1 className="font-bold text-3xl md:text-4xl text-neutral">
            Page Not Found
          </h1>
          <p>
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <MyButton onClick={() => navigate("/")}>Back to Home</MyButton>
        </div>
      </section>
    </>
  );
};

export default ErrorPage;
