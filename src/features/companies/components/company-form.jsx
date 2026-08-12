import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FormField from "@/components/ui/form-field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { companySchema } from "../validation/company";

const buildDefaultValues = (company) => {
  return {
    name: company?.name ?? "",
    website: company?.website ?? "",
    industry: company?.industry ?? "",
    about: company?.about ?? "",
    logo: company?.logo ?? "",
    location: {
      city: company?.location?.city ?? "",
      state: company?.location?.state ?? "",
      country: company?.location?.country ?? "",
    },
  };
};

const buildPayload = (values) => {
  const payload = {
    name: values.name.trim(),
    ...(values.website?.trim() ? { website: values.website.trim() } : {}),
    ...(values.industry?.trim() ? { industry: values.industry.trim() } : {}),
    ...(values.about?.trim() ? { about: values.about.trim() } : {}),
    ...(values.logo?.trim() ? { logo: values.logo.trim() } : {}),
  };

  const location = {
    city: values.location?.city ?? "",
    state: values.location?.state ?? "",
    country: values.location?.country ?? "",
  };

  if (location.city || location.state || location.country) {
    payload.location = location;
  }

  return payload;
};

const CompanyForm = ({
  initialCompany,
  onSubmit,
  isSubmitting,
  onCancel,
  submitLabel = "Save",
  loadingLabel = "Saving...",
}) => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: buildDefaultValues(initialCompany),
  });

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(buildPayload(values)))}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Company Information</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              name={"name"}
              label={"Company Name"}
              control={control}
              required
              placeholder="e.g. Tech Corp"
            />

            <FormField
              name="website"
              control={control}
              label="Website"
              type="url"
              placeholder={"https://example.com"}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              name="industry"
              control={control}
              label="Industry"
              placeholder={"e.g. Software Development"}
            />

            <FormField
              name="logo"
              control={control}
              label="Logo URL"
              type="url"
              placeholder="https://example.com/logo.png"
            />
          </div>

          <FormField
            name="about"
            control={control}
            label="About"
            rows={5}
            type="textarea"
            placeholder="Tell job seekers about your company..."
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Location</h2>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <FormField
              name="location.city"
              control={control}
              label="City"
              placeholder="e.g. Dhaka"
            />

            <FormField
              name="location.state"
              control={control}
              label="State"
              placeholder="e.g. Dhaka Division"
            />

            <FormField
              name="location.country"
              control={control}
              label="Country"
              placeholder="e.g. Bangladesh"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {loadingLabel}
            </>
          ) : (
            submitLabel
          )}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CompanyForm;
