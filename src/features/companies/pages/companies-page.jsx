import Container from "@/components/shared/container";
import NotFound from "@/components/shared/not-found";
import Pagination from "@/components/shared/pagination";
import SearchInput from "@/components/shared/search-input";
import Seo from "@/components/shared/seo";
import { toast } from "@/components/ui/toast";
import { COMPANY_STATUS, USER_ROLE } from "@/constants/enums";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";
import useAuth from "@/stores/auth";
import { Building2 } from "lucide-react";
import { useState } from "react";
import CompanyCard from "../components/company-card";
import CompanyCardSkeleton from "../components/company-card-skeleton";
import CompanyDetailsModal from "../components/company-details-modal";
import { useCompanies, useJoinCompany } from "../hooks/use-companies";

const CompaniesPage = () => {
  const user = useAuth((s) => s.user);
  const isJobSeeker = user?.role === USER_ROLE.JOB_SEEKER;
  const joinCompany = useJoinCompany();
  const { search, setSearch, debouncedSearch } = useDebouncedSearch(() =>
    setPage(1),
  );
  const [page, setPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const filters = {
    page,
    limit: 9,
    ...(debouncedSearch && { search: debouncedSearch }),
    status: COMPANY_STATUS.ACTIVE,
  };

  const { data, isLoading } = useCompanies(filters);
  const companies = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const joiningId = joinCompany.isPending ? joinCompany.variables : null;

  const handleRequest = async (companyId) => {
    try {
      await joinCompany.mutateAsync(companyId);
      toast.success({
        title: "Request sent",
        description: "Awaiting approval from the company owner.",
      });
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
        title="Companies"
        description="Browse companies on Labora, explore their open roles, and request to join their teams."
      />
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
        <p className="text-muted-foreground">
          Discover companies hiring on Labora
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
        <CompanyCardSkeleton count={6} />
      ) : companies.length === 0 ? (
        <NotFound message="No companies found" icon={Building2} />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <CompanyCard
                key={company._id}
                company={company}
                showSeats
                showDetails
                onViewDetails={setSelectedCompany}
                showJoin={isJobSeeker}
                onJoin={handleRequest}
                isJoining={joiningId === company._id}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          )}
        </>
      )}

      <CompanyDetailsModal
        company={selectedCompany}
        open={!!selectedCompany}
        onOpenChange={() => setSelectedCompany(null)}
        showJoin={isJobSeeker}
        onJoin={handleRequest}
        isJoining={joiningId === selectedCompany?._id}
      />
    </Container>
  );
};

export default CompaniesPage;
