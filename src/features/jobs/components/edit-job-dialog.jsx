import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { useUpdateJob } from "../hooks/use-jobs";
import JobForm from "./job-form";

const EditJobDialog = ({ job, open, onOpenChange }) => {
  const updateJob = useUpdateJob();

  if (!open) return null;

  const handleSubmit = async (payload) => {
    try {
      await updateJob.mutateAsync({ id: job._id, ...payload });
      onOpenChange(false);
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to update job");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-2xl p-0">
      <div className="overflow-hidden rounded-lg">
        <ScrollArea className="max-h-[80dvh] w-full">
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b bg-background px-5 py-4 sm:px-6 sm:py-5">
            <DialogTitle className="text-xl">Edit Job</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-muted-foreground"
              onClick={() => onOpenChange(false)}
              aria-label="Close edit job"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <JobForm
              initialJob={job}
              onSubmit={handleSubmit}
              isSubmitting={updateJob.isPending}
              onCancel={() => onOpenChange(false)}
              submitLabel="Update Job"
              loadingLabel="Updating..."
            />
          </div>
        </ScrollArea>
      </div>
    </Dialog>
  );
};

export default EditJobDialog;
