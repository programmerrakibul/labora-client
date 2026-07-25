import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import getAuthErrorMessage from "../lib/getAuthErrorMessage";
import { loginSuccessMessage } from "../lib/getLoginMessage";
import useAuthInfo from "./useAuthInfo";

const useGoogleLogin = () => {
  const navigate = useNavigate();
  const { loginUserWithGoogle } = useAuthInfo();
  const [googleLoading, setGoogleLoading] = useState(false);
  const { state } = useLocation();

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);

    try {
      const userCreds = await loginUserWithGoogle();
      const user = userCreds.user;

      loginSuccessMessage(user.displayName);
      navigate((state && state.path) || "/", { replace: true });
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
