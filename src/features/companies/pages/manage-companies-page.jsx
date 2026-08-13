import { COMPANY_STATUS_CONFIG } from "@/constants/enum-configs";
import { FieldSelect } from "@/components/forms/form-field";
import Container from "@/components/shared/container";
import NotFound from "@/components/shared/not-found";
import Pagination from "@/components/shared/pagination";
import SearchInput from "@/components/shared/search-input";
import Seo from "@/components/shared/seo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";
import { Building2 } from "lucide-react";
import { useState } from "react";
import CompanyCard from "../components/company-card";
import CompanyCardSkeleton from "../components/company-card-skeleton";
import CompanyDetailsModal from "../components/company-details-modal";
import { useCompanies, useDeleteCompany } from "../hooks/use-companies";

const ManageCompaniesPage = () => {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const { search, setSearch, debouncedSearch } = useDebouncedSearch(() =>
    setPage(1),
  );

  const filters = {
    page,
    limit: 9,
    isAdmin: "true",
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(statusFilter && { status: statusFilter }),
  };

  const { data, isLoading } = useCompanies(filters);
  const deleteCompany = useDeleteCompany();

  const companies = data?.data || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const handleDelete = async () => {
    if (!companyToDelete) return;

    await deleteCompany.mutateAsync(companyToDelete._id);
    setCompanyToDelete(null);
  };

  return (
    <Container className="py-8">
      <Seo title="Manage Companies" noindex />
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Manage Companies</h1>
        <p className="text-muted-foreground">
          View and manage platform companies
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <SearchInput
          placeholder="Search by name, email or industry..."
          value={search}
          onChange={setSearch}
          onClear={() => setSearch("")}
          className="max-w-sm"
        />
        <FieldSelect
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="sm:w-52"
        >
          <option value="">All Statuses</option>
          {Object.values(COMPANY_STATUS_CONFIG).map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </FieldSelect>
      </div>

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
                showStatus
                showDelete
                onViewDetails={setSelectedCompany}
                onDelete={setCompanyToDelete}
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
      />

      <Dialog
        open={!!companyToDelete}
        onOpenChange={() => setCompanyToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Company</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                {companyToDelete?.name}
              </span>
              ? The company will be suspended, its members removed, and this
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCompanyToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteCompany.isPending}
            >
              {deleteCompany.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ManageCompaniesPage;
