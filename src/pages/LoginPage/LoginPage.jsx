import { useState } from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import useAuthInfo from "../../hooks/useAuthInfo";
import bgImg from "../../assets/auth_login.svg";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import MyLabel from "../../components/MyLabel/MyLabel";
import MyInput from "../../components/MyInput/MyInput";
import MyButton from "../../components/MyButton/MyButton";
import ActionSpinner from "../../components/ActionSpinner/ActionSpinner";
import getAuthErrorMessage from "../../utilities/getAuthErrorMessage";
import useLoginSuccessMessage from "../../hooks/useLoginSuccessMessage";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import MyContainer from "../../components/MyContainer/MyContainer";
import MyTitle from "../../components/MyTitle/MyTitle";

const LoginPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { loginUser } = useAuthInfo();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const loginSuccessMessage = useLoginSuccessMessage();
  const { handleGoogleLogin, googleLoading } = useGoogleLogin();

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
      navigate((state && state.path) || "/");
    } catch (err) {
      const errorMessage = getAuthErrorMessage(err.code);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Login in to your account - Labora</title>

      <section className="py-8 my-6">
        <MyContainer className="space-y-10">
          <div>
            <MyTitle>Login Now</MyTitle>
          </div>

          <div className="p-4 md:p-8 rounded-md shadow-md bg-primary/7 flex md:items-center md:justify-between md:gap-8 max-w-md md:max-w-full mx-auto">
            <div className="flex-1/2 hidden md:inline-block">
              <img src={bgImg} alt="Register here" />
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
                  <a className="link link-hover text-sm">Forgotten Password?</a>
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

                <button
                  type="button"
                  disabled={googleLoading || loading}
                  onClick={() => handleGoogleLogin(state && state.path) || "/"}
                  className="btn btn-sm md:btn-md btn-block bg-white text-black border-[#e5e5e5]"
                >
                  {googleLoading ? (
                    <ActionSpinner />
                  ) : (
                    <>
                      <FcGoogle size={22} />
                      Login with Google
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </MyContainer>
      </section>
    </>
  );
};

export default LoginPage;
