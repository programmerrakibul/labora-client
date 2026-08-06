import {
  Field,
  FieldInput,
  FieldLabel,
  FieldTextarea,
} from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/toast";
import { useCreateApplication } from "@/features/applications/hooks/use-applications";
import { getErrorMessage } from "@/lib/error";
import { useState } from "react";

const defaultValues = {
  resumeUrl: "",
  coverLetter: "",
  expectedSalary: "",
};

const JobApplyForm = ({ job, onCancel }) => {
  const createApplication = useCreateApplication();
  const [formData, setFormData] = useState(defaultValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createApplication.mutateAsync({
        jobId: job._id,
        resumeUrl: formData.resumeUrl,
        coverLetter: formData.coverLetter,
        expectedSalary: formData.expectedSalary
          ? parseFloat(formData.expectedSalary)
          : undefined,
      });
      toast.success({
        title: "Application submitted",
        description: "Your application has been submitted successfully.",
      });
      setFormData(defaultValues);
      onCancel();
    } catch (err) {
      const errorMessage = getErrorMessage(err);

      toast.error({
        title: "Failed to apply",
        description: errorMessage || "Failed to apply for the job.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Apply for this Job</h3>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Field>
            <FieldLabel required>Resume URL</FieldLabel>
            <FieldInput
              type="url"
              required
              value={formData.resumeUrl}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, resumeUrl: e.target.value }))
              }
              placeholder="https://your-resume.pdf"
            />
          </Field>
          <Field>
            <FieldLabel>Cover Letter</FieldLabel>
            <FieldTextarea
              rows={3}
              value={formData.coverLetter}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  coverLetter: e.target.value,
                }))
              }
            />
          </Field>
          <Field>
            <FieldLabel>
              Expected Salary ({job.salary?.currency || "BDT"})
            </FieldLabel>
            <FieldInput
              type="number"
              min="0"
              max={job.salary?.max || undefined}
              step="0.01"
              placeholder={`Enter expected salary (max: ${
                job.salary?.max || "N/A"
              })`}
              value={formData.expectedSalary}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  expectedSalary: e.target.value,
                }))
              }
            />
          </Field>
          <div className="flex gap-2">
            <Button type="submit" disabled={createApplication.isPending}>
              {createApplication.isPending
                ? "Submitting..."
                : "Submit Application"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobApplyForm;
