import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router";
import useAuthInfo from "../../hooks/useAuthInfo";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import MyLabel from "../../components/MyLabel/MyLabel";
import MyInput from "../../components/MyInput/MyInput";
import MyButton from "../../components/MyButton/MyButton";
import ActionSpinner from "../../components/ActionSpinner/ActionSpinner";
import getAuthErrorMessage from "../../utilities/getAuthErrorMessage";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import MyContainer from "../../components/MyContainer/MyContainer";
import MyTitle from "../../components/MyTitle/MyTitle";
import useThemeContext from "../../hooks/useThemeContext";
import loginGIF from "../../../lotties/login.json";
import loginGIFDark from "../../../lotties/login_dark.json";
import Lottie from "lottie-react";
// eslint-disable-next-line no-unused-vars
import * as motion from "motion/react-client";
import { loginSuccessMessage } from "../../utilities/getLoginMessage";
import GoogleButton from "../../components/GoogleButton/GoogleButton";

const LoginPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { theme } = useThemeContext();
  const { loginUser } = useAuthInfo();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { googleLoading, handleGoogleLogin } = useGoogleLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const email = form.email.value.trim();
    const password = form.password.value;

    try {
      const userCreds = await loginUser(email, password);
      const user = userCreds.user;

      loginSuccessMessage(user.displayName);
      navigate((state && state.path) || "/", { replace: true });
    } catch (err) {
      const errorMessage = getAuthErrorMessage(err.code);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const data = theme === "light" ? loginGIF : loginGIFDark;

  return (
    <>
      <title>Login in to your account - Labora</title>

      <motion.section
        className="py-8 my-6"
        initial={{ opacity: 0, x: "-100vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", delay: 0.3, bounce: 0.4 }}
      >
        <MyContainer>
          <div className="space-y-10 max-w-4xl mx-auto">
            <div>
              <MyTitle>Login Now</MyTitle>
            </div>

            <div className="p-4 md:p-8 rounded-md shadow-md bg-primary/7 dark:bg-info/15 flex md:items-center md:justify-between md:gap-8 max-w-md md:max-w-full mx-auto">
              <div className="flex-1/2 hidden md:inline-block">
                <Lottie animationData={data} />
              </div>

              <div className="flex-1/2">
                <form onSubmit={handleLogin} className="space-y-3.5">
                  <div className="space-y-1.5">
                    <MyLabel htmlFor="email">Email</MyLabel>
                    <MyInput
                      name="email"
                      type="email"
                      disabled={loading}
                      holder="john-doe@gmail.com"
                    />
                  </div>

                  <div className="space-y-1.5 mb-0.5">
                    <MyLabel htmlFor="password">Password</MyLabel>
                    <div className="relative">
                      <MyInput
                        disabled={loading}
                        name="password"
                        type={show ? "text" : "password"}
                        holder="••••••••"
                      />
                      <span
                        onClick={() => setShow(!show)}
                        className="cursor-pointer absolute right-5 top-[50%] -translate-y-[50%] z-10"
                      >
                        {show ? <VscEye /> : <VscEyeClosed />}
                      </span>
                    </div>
                  </div>

                  <div className="text-end">
                    <a className="link link-hover text-sm">
                      Forgotten Password?
                    </a>
                  </div>

                  <div>
                    <MyButton
                      disabled={loading || googleLoading}
                      className="btn-block"
                    >
                      {loading ? <ActionSpinner /> : "Login"}
                    </MyButton>
                  </div>

                  <div className="text-center">
                    Don't have an account?{" "}
                    <Link to="/auth/register" className="link link-hover">
                      Register here
                    </Link>
                  </div>

                  <div className="divider">OR</div>

                  <GoogleButton
                    onClick={handleGoogleLogin}
                    disabled={loading || googleLoading}
                  />
                </form>
              </div>
            </div>
          </div>
        </MyContainer>
      </motion.section>
    </>
  );
};

export default LoginPage;
