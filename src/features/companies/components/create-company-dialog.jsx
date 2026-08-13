import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useNavigate } from "react-router";
import CompanyForm from "./company-form";
import { useCreateCompany } from "../hooks/use-companies";

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
      className="max-h-[90dvh] max-w-3xl overflow-y-auto"
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Company</DialogTitle>
          <DialogDescription>
            Set up your company profile to start hiring on Labora
          </DialogDescription>
        </DialogHeader>
        <CompanyForm
          onSubmit={handleSubmit}
          isSubmitting={createCompany.isPending}
          onCancel={() => onOpenChange(false)}
          submitLabel="Create Company"
          loadingLabel="Creating..."
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCompanyDialog;
