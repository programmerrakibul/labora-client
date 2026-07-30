import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUpdateProfile } from "../hooks/use-users";
import useAuth, { updateUser } from "@/stores/auth";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldLabel,
  FieldInput,
  FieldError,
} from "@/components/forms/form-field";
import Container from "@/components/shared/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

const EditProfilePage = () => {
  const user = useAuth((s) => s.user);
  const navigate = useNavigate();
  const updateProfile = useUpdateProfile();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (values) => {
    try {
      const { data } = await updateProfile.mutateAsync(values);
      if (data) {
        updateUser(data);
      }
      navigate("/dashboard/profile");
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to update profile");
    }
  };

  return (
    <Container className="py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Edit Profile</h1>
        <p className="text-muted-foreground">Update your personal information</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel required>Full Name</FieldLabel>
                  <FieldInput {...field} error={fieldState.error} />
                  <FieldError error={fieldState.error} />
                </Field>
              )}
            />

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Phone Number</FieldLabel>
                  <FieldInput {...field} error={fieldState.error} />
                  <FieldError error={fieldState.error} />
                </Field>
              )}
            />

            <Controller
              name="address"
              control={control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Address</FieldLabel>
                  <FieldInput {...field} error={fieldState.error} />
                  <FieldError error={fieldState.error} />
                </Field>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="city"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>City</FieldLabel>
                    <FieldInput {...field} error={fieldState.error} />
                    <FieldError error={fieldState.error} />
                  </Field>
                )}
              />
              <Controller
                name="country"
                control={control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Country</FieldLabel>
                    <FieldInput {...field} error={fieldState.error} />
                    <FieldError error={fieldState.error} />
                  </Field>
                )}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditProfilePage;
