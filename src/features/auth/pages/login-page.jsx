import {
  Field,
  FieldError,
  FieldInput,
  FieldLabel,
} from "@/components/forms/form-field";
import PasswordInput from "@/components/forms/password-input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import GoogleSignInButton from "@/features/auth/components/google-sign-in-button";
import DemoLoginButtons from "@/features/auth/components/demo-login-buttons";
import urlUtils from "@/lib/url";
import { login } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router";
import { loginSchema } from "../validation/auth";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const callbackUrl =
    searchParams.get("callbackUrl") || urlUtils.getFullUrl("/");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values) => {
    setError("");
    try {
      await login(values.email, values.password, callbackUrl);
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

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel required data-invalid={fieldState.invalid}>
                  Email
                </FieldLabel>
                <FieldInput
                  type="email"
                  placeholder="you@example.com"
                  aria-invalid={fieldState.invalid}
                  {...field}
                  error={fieldState.error}
                />
                <FieldError error={fieldState.error} />
              </Field>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <PasswordInput
                label="Password"
                required
                placeholder="Enter your password"
                error={fieldState.error}
                {...field}
              />
            )}
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
