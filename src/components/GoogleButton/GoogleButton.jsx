import { FcGoogle } from "react-icons/fc";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import ActionSpinner from "../ActionSpinner/ActionSpinner";
// eslint-disable-next-line no-unused-vars
import * as motion from "motion/react-client";

const buttonVariants = {
  hidden: {
    scale: 1,
  },
  visible: {
    scale: 1.1,
    transition: {
      duration: 0.4,
    },
  },
};

const GoogleButton = ({ to = "/", disabled }) => {
  const { googleLoading, handleGoogleLogin } = useGoogleLogin();

  return (
    <>
      <motion.button
        variants={buttonVariants}
        initial="hidden"
        whileHover="visible"
        type="button"
        disabled={googleLoading || disabled}
        onClick={() => handleGoogleLogin(to)}
        className="btn btn-sm md:btn-md btn-block bg-white text-neutral dark:bg-neutral dark:border-neutral dark:shadow-white/20 dark:hover:shadow-md transition-shadow duration-300 dark:shadow dark:text-white border-[#e5e5e5]"
      >
        {googleLoading ? (
          <ActionSpinner />
        ) : (
          <>
            <FcGoogle size={22} />
            Login with Google
          </>
        )}
      </motion.button>
    </>
  );
};

export default GoogleButton;
