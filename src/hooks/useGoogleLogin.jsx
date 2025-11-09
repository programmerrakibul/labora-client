import { useState } from "react";
import useAuthInfo from "./useAuthInfo";
import getAuthErrorMessage from "../utilities/getAuthErrorMessage";
import { toast } from "react-toastify";
import useLoginSuccessMessage from "./useLoginSuccessMessage";
import { useNavigate } from "react-router";

const useGoogleLogin = () => {
  const navigate = useNavigate();
  const { loginUserWithGoogle } = useAuthInfo();
  const loginSuccessMessage = useLoginSuccessMessage();
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleLogin = async (to = "/") => {
    setGoogleLoading(true);

    try {
      const userCreds = await loginUserWithGoogle();
      const user = userCreds.user;

      loginSuccessMessage(user.displayName);
      navigate(to);
    } catch (err) {
      const errorMessage = getAuthErrorMessage(err.code);
      toast.error(errorMessage);
    } finally {
      setGoogleLoading(false);
    }
  };

  return { handleGoogleLogin, googleLoading };
};

export default useGoogleLogin;
