import { Button } from "@/components/ui/button";
import FormField from "@/components/ui/form-field";
import { toast } from "@/components/ui/toast";
import { getErrorMessage } from "@/lib/error";
import useAuth, { updateUser } from "@/stores/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useUpdateProfile } from "../hooks/use-users";
import { profileSchema } from "../validation/profile";

const EditProfileForm = ({ onCancel, onSuccess }) => {
  const user = useAuth((s) => s.user);
  const updateProfile = useUpdateProfile();

  const defaultValues = useMemo(
    () => ({
      name: user?.name || "",
      phoneNumber: user?.phoneNumber || "",
      address: user?.address || "",
      city: user?.city || "",
      country: user?.country || "",
    }),
    [user],
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  useEffect(() => {
    if (user) {
      reset(defaultValues);
    }
  }, [defaultValues, reset, user]);

  const onSubmit = async (values) => {
    try {
      const { data } = await updateProfile.mutateAsync(values);
      if (data) {
        updateUser(data);
      }
      onSuccess?.();
    } catch (err) {
      const msg = getErrorMessage(err);
      toast.error({
        title: "Error updating profile",
        description: msg || "An error occurred while updating your profile.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        name="name"
        control={control}
        label="Full Name"
        required
        placeholder="e.g. John Doe"
      />

      <FormField
        name="phoneNumber"
        control={control}
        label="Phone Number"
        placeholder={"+88012651465"}
      />

      <FormField
        name="address"
        control={control}
        label="Address"
        placeholder="e.g. 123 Main St, Anytown, USA"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          name="city"
          control={control}
          label="City"
          placeholder="e.g. New York"
        />

        <FormField
          name="country"
          control={control}
          label="Country"
          placeholder="e.g. USA"
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
