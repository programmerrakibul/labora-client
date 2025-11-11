import { useNavigate } from "react-router";
import notFoundImg from "../../assets/data_not_found.svg";
import notFoundImgDark from "../../assets/data_not_found_dark.svg";
import useThemeContext from "../../hooks/useThemeContext";
import MyButton from "../MyButton/MyButton";

const DataNotFound = ({ children, value }) => {
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  const image = theme === "light" ? notFoundImg : notFoundImgDark;

  return (
    <div className="flex items-center justify-center">
      <div className="text-center space-y-5 max-w-md w-full">
        <img src={image} alt="Data Not Found" />
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
          {children}
        </h3>
        {value === "jobs" && (
          <MyButton onClick={() => navigate("/all-jobs")}>
            Explore Jobs
          </MyButton>
        )}

        {value === "tasks" && (
          <MyButton onClick={() => navigate("/add-job")}>
            Post Your Job
          </MyButton>
        )}
      </div>
    </div>
  );
};

export default DataNotFound;
