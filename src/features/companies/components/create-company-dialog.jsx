import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router";
import { useCreateCompany } from "../hooks/use-companies";
import CompanyForm from "./company-form";

const CreateCompanyDialog = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const createCompany = useCreateCompany();

  const handleSubmit = async (payload) => {
    await createCompany.mutateAsync(payload);
    onOpenChange(false);
    navigate("/dashboard");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      className="max-w-3xl overflow-hidden"
    >
      <DialogContent className="space-y-6">
        <DialogHeader>
          <DialogTitle>Create a Company</DialogTitle>
          <DialogDescription>
            Set up your company profile to start hiring on Labora
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <ScrollArea className="max-h-[calc(90dvh-50px)] w-full">
          <CompanyForm
            onSubmit={handleSubmit}
            isSubmitting={createCompany.isPending}
            onCancel={() => onOpenChange(false)}
            submitLabel="Create Company"
            loadingLabel="Creating..."
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCompanyDialog;
