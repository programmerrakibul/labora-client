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
import { register as registerUser } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { registerSchema } from "../validation/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (values) => {
    setError("");
    try {
      await registerUser(values.name, values.email, values.password);
      navigate("/");
    } catch (err) {
      setError(err?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Create an account
          </h1>
          <p className="text-muted-foreground">
            Join Labora and start your journey
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel required>Full Name</FieldLabel>
                <FieldInput
                  type="text"
                  placeholder="John Doe"
                  {...field}
                  error={fieldState.error}
                />
                <FieldError error={fieldState.error} />
              </Field>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel required>Email</FieldLabel>
                <FieldInput
                  type="email"
                  placeholder="you@example.com"
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
                placeholder="At least 6 characters"
                error={fieldState.error}
                {...field}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
              <PasswordInput
                label="Confirm Password"
                required
                placeholder="Confirm your password"
                error={fieldState.error}
                {...field}
              />
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

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
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
