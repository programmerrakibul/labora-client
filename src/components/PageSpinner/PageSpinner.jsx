import { RotateLoader } from "react-spinners";
import useThemeContext from "../../hooks/useThemeContext";

const PageSpinner = () => {
  const { theme } = useThemeContext();

  const color = theme === "light" ? "#E56BB3" : "#54B2F8";

  return (
    <div className="w-full min-h-dvh grid place-items-center">
      <RotateLoader color={color} />
    </div>
  );
};

export default PageSpinner;
