import { useState } from "react";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import useAuthInfo from "../../hooks/useAuthInfo";
import bgImg from "../../assets/auth_sign-up.svg";
import useGoogleLogin from "../../hooks/useGoogleLogin";
import MyLabel from "../../components/MyLabel/MyLabel";
import MyInput from "../../components/MyInput/MyInput";
import MyButton from "../../components/MyButton/MyButton";
import ActionSpinner from "../../components/ActionSpinner/ActionSpinner";
import getAuthErrorMessage from "../../utilities/getAuthErrorMessage";
import useLoginSuccessMessage from "../../hooks/useLoginSuccessMessage";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const loginSuccessMessage = useLoginSuccessMessage();
  const { createUser, updateUserProfile } = useAuthInfo();
  const { handleGoogleLogin, googleLoading } = useGoogleLogin();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const displayName = form.name.value.trim();
    const email = form.email.value.trim();
    const photoURL = form.photoURL.value.trim();
    const password = form.password.value;
    const lowerCase = /[a-z]/;
    const upperCase = /[A-Z]/;

    if (!displayName || !email || !photoURL) {
      toast.warn("Enter valid information");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.warn("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (!upperCase.test(password)) {
      toast.warn("Password must contain at least one uppercase letter");
      setLoading(false);
      return;
    }

    if (!lowerCase.test(password)) {
      toast.warn("Password must contain at least one lowercase letter");
      setLoading(false);
      return;
    }

    if (password.includes(" ")) {
      toast.warn("Password cannot contain spaces");
      return;
    }

    try {
      const userCreds = await createUser(email, password);
      const user = userCreds.user;

      await updateUserProfile({ ...user, photoURL, displayName });

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
            <div className="flex-1/2">
              <form onSubmit={handleCreateUser} className="space-y-3.5">
                <div className="space-y-1.5">
                  <MyLabel htmlFor="name">Name</MyLabel>
                  <MyInput disabled={loading} name="name" holder="John Doe" />
                </div>

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
                  <MyLabel htmlFor="photoURL">Photo URL</MyLabel>
                  <MyInput
                    disabled={loading}
                    name="photoURL"
                    holder="https://example.png"
                  />
                </div>

                <div className="space-y-1.5">
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

                <div>
                  <MyButton
                    disabled={loading || googleLoading}
                    className="btn-block"
                  >
                    {loading ? <ActionSpinner /> : "Register"}
                  </MyButton>
                </div>

                <div className="text-center">
                  Already have an account?{" "}
                  <Link to="/auth/login" className="link link-hover">
                    Login here
                  </Link>
                </div>

                <div className="divider divider-neutral">OR</div>

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

            <div className="flex-1/2 space-y-8">
              <h3 className="text-center font-bold text-3xl text-neutral">
                Register Now
              </h3>

              <img src={bgImg} alt="Register here" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
