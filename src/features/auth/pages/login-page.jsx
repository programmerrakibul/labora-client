import Seo from "@/components/shared/seo";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import PasswordInput from "@/components/ui/password-input";
import { Separator } from "@/components/ui/separator";
import DemoLoginButtons from "@/features/auth/components/demo-login-buttons";
import GoogleSignInButton from "@/features/auth/components/google-sign-in-button";
import { login } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { loginSchema } from "../validation/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const to = searchParams.get("to") || "/";

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values) => {
    setError("");
    try {
      await login(values.email, values.password);
      navigate(to);
    } catch (err) {
      setError(err?.message || "Login failed. Please try again.");

      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const fillDemoCredentials = (email, password) => {
    setError("");
    setValue("email", email);
    setValue("password", password);
    handleSubmit(onSubmit)();
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
      <Seo
        title="Sign In"
        noindex
        description="Sign in to your Labora account to apply for jobs, post listings, and manage your freelance career."
      />
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <FormField
            name="email"
            label="Email"
            control={control}
            placeholder={"you@example.com"}
            required
          />

          <FormField
            name="password"
            label="Password"
            control={control}
            renderComponent={({ field, fieldState }) => (
              <PasswordInput
                {...field}
                id={field.name}
                placeholder="At least 6 characters"
                ariaInvalid={fieldState.invalid}
              />
            )}
            required
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <DemoLoginButtons onFill={fillDemoCredentials} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <GoogleSignInButton className="w-full" />

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            to="/auth/register"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
