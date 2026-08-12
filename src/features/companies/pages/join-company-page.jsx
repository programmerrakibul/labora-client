import Container from "@/components/shared/container";
import NotFound from "@/components/shared/not-found";
import SearchInput from "@/components/shared/search-input";
import Seo from "@/components/shared/seo";
import Skeleton from "@/components/shared/skeleton";
import { toast } from "@/components/ui/toast";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";
import useAuth from "@/stores/auth";
import { Building2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import CompanyCard from "../components/company-card";
import { useCompanies, useJoinCompany } from "../hooks/use-companies";

const JoinCompanyPage = () => {
  const navigate = useNavigate();
  const user = useAuth((s) => s.user);
  const joinCompany = useJoinCompany();
  const { search, setSearch, debouncedSearch } = useDebouncedSearch();

  const isCompanyUser =
    user?.role === "COMPANY_OWNER" || user?.role === "COMPANY_MEMBER";

  useEffect(() => {
    if (isCompanyUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [isCompanyUser, navigate]);

  const filters = {
    page: 1,
    limit: 12,
    ...(debouncedSearch && { search: debouncedSearch }),
  };

  const { data, isLoading } = useCompanies(filters);
  const companies = data?.data || [];

  const handleRequest = async (companyId) => {
    try {
      await joinCompany.mutateAsync(companyId);
      toast.success({
        title: "Request sent",
        description: "Awaiting approval from the company owner.",
      });
      navigate("/dashboard/company/onboarding");
    } catch (err) {
      if (err?.response?.status === 409) {
        toast.error({
          title: "Already requested or company full",
          description:
            "You may already have a pending request for this company.",
        });
      } else {
        toast.error({
          title: "Request failed",
          description:
            err?.response?.data?.error ||
            "An error occurred while sending your request.",
        });
      }
    }
  };

  return (
    <Container className="py-8">
      <Seo
        title="Join a Company"
        noindex
        description="Search companies on Labora and request to join their team."
      />
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Join a Company</h1>
        <p className="text-muted-foreground">
          Find a company and request to join their team
        </p>
      </div>

      <SearchInput
        placeholder="Search by company name or industry..."
        value={search}
        onChange={setSearch}
        onClear={() => setSearch("")}
        className="mb-6 max-w-sm"
      />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44 w-full" />
          ))}
        </div>
      ) : companies.length === 0 ? (
        <NotFound
          message="No companies found"
          icon={Building2}
          actionLabel="Create a Company"
          action={() => navigate("/dashboard/company/create")}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => (
            <CompanyCard
              key={company._id}
              company={company}
              onJoin={handleRequest}
              isJoining={joinCompany.isPending}
            />
          ))}
        </div>
      )}
    </Container>
  );
};

export default JoinCompanyPage;
