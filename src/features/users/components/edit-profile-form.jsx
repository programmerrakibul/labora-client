import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProfile } from "../hooks/use-users";
import useAuth, { updateUser } from "@/stores/auth";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldInput,
  FieldLabel,
} from "@/components/forms/form-field";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { profileSchema } from "../validation/profile";

const EditProfileForm = ({ onCancel, onSuccess }) => {
  const user = useAuth((s) => s.user);
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
      onSuccess?.();
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to update profile");
    }
  };

  return (
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
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EditProfileForm;
