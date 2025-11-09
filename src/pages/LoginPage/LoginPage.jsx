import { useState } from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import useAuthInfo from "../../hooks/useAuthInfo";
import bgImg from "../../assets/auth_login.svg";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import MyLabel from "../../components/MyLabel/MyLabel";
import MyInput from "../../components/MyInput/MyInput";
import MyButton from "../../components/MyButton/MyButton";
import ActionSpinner from "../../components/ActionSpinner/ActionSpinner";
import getAuthErrorMessage from "../../utilities/getAuthErrorMessage";
import useLoginSuccessMessage from "../../hooks/useLoginSuccessMessage";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const loginSuccessMessage = useLoginSuccessMessage();
  const { loginUser } = useAuthInfo();
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
      navigate("/");
    } catch (err) {
      const errorMessage = getAuthErrorMessage(err.code);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Login Now</title>

      <section className="py-8 my-6">
        <div className="p-8 rounded-md shadow-md mx-auto w-full max-w-5xl bg-primary/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 ">
            <div className="flex-1/2 space-y-8">
              <h3 className="text-center font-bold text-3xl text-neutral">
                Login Now
              </h3>

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

                <div className="space-y-1.5">
                  <MyLabel htmlFor="password">Password</MyLabel>
                  <MyInput
                    disabled={loading}
                    name="password"
                    type="password"
                    holder="••••••••"
                  />
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

                <div className="divider divider-primary">OR</div>

                <button
                  type="button"
                  disabled={googleLoading || loading}
                  onClick={() => handleGoogleLogin()}
                  className="btn btn-block bg-white text-black border-[#e5e5e5]"
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
        </div>
      </section>
    </>
  );
};

export default LoginPage;
