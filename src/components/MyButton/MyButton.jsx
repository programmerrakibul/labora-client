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

const MyButton = ({ children, onClick, className = "", disabled = false }) => {
  return (
    <>
      <motion.button
        variants={buttonVariants}
        initial="hidden"
        whileHover="visible"
        disabled={disabled}
        onClick={onClick}
        className={`btn btn-sm md:btn-md primary_linear primary_linear_hover shadow-none border-none text-white ${className}`}
      >
        {children}
      </motion.button>
    </>
  );
};

export default MyButton;
