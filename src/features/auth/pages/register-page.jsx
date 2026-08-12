import Seo from "@/components/shared/seo";
import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import PasswordInput from "@/components/ui/password-input";
import { Separator } from "@/components/ui/separator";
import GoogleSignInButton from "@/features/auth/components/google-sign-in-button";
import { register as registerUser } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
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
      <Seo
        title="Create an Account"
        noindex
        description="Join Labora and start your journey today."
      />
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

          <FormField
            name="name"
            label="Full Name"
            control={control}
            placeholder={"John Doe"}
            required
          />

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

          <FormField
            name="confirmPassword"
            label="Confirm Password"
            control={control}
            renderComponent={({ field, fieldState }) => (
              <PasswordInput
                {...field}
                id={field.name}
                placeholder="At least 6 characters"
                ariaInvalid={fieldState.error}
              />
            )}
            required
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
