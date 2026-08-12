import Container from "@/components/shared/container";
import Seo from "@/components/shared/seo";
import useAuth from "@/stores/auth";
import { Navigate, useNavigate } from "react-router";
import CompanyForm from "../components/company-form";
import { useCreateCompany } from "../hooks/use-companies";

const CreateCompanyPage = () => {
  const navigate = useNavigate();
  const user = useAuth((s) => s.user);
  const createCompany = useCreateCompany();

  const isCompanyUser =
    user?.role === "COMPANY_OWNER" || user?.role === "COMPANY_MEMBER";

  if (isCompanyUser) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (payload) => {
    await createCompany.mutateAsync(payload);
    navigate("/dashboard");
  };

  return (
    <Container className="py-8">
      <Seo
        title="Create a Company"
        noindex
        description="Create your company profile on Labora and start posting jobs."
      />
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Create a Company</h1>
        <p className="text-muted-foreground">
          Set up your company profile to start hiring on Labora
        </p>
      </div>

      <CompanyForm
        onSubmit={handleSubmit}
        isSubmitting={createCompany.isPending}
        onCancel={() => navigate(-1)}
        submitLabel="Create Company"
        loadingLabel="Creating..."
      />
    </Container>
  );
};

export default CreateCompanyPage;
