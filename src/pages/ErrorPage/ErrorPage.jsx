import { useNavigate } from "react-router";
import MyButton from "../../components/ui/MyButton/MyButton";
import useThemeContext from "../../hooks/useThemeContext";
import GIF404 from "../../../lotties/page_not_found.json";
import GIF404Dark from "../../../lotties/page_not_found_dark.json";
import Lottie from "lottie-react";

const ErrorPage = () => {
  const navigate = useNavigate();
  const { theme } = useThemeContext();

  const data = theme === "light" ? GIF404 : GIF404Dark;

  return (
    <>
      <title>Page Not Found</title>

      <section className="min-h-dvh w-full grid place-items-center px-5 py-8">
        <div className="max-w-md w-full text-center space-y-6">
          <Lottie animationData={data} loop={true} />
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
