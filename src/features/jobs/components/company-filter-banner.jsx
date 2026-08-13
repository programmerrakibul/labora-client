import { Button } from "@/components/ui/button";
import useJobFilters, { setCompanyId } from "@/stores/job-filters";
import { Building2, X } from "lucide-react";
import { useCompany } from "@/features/companies/hooks/use-companies";

const CompanyFilterBanner = () => {
  const companyId = useJobFilters((s) => s.companyId);
  const { data: company } = useCompany(companyId);

  if (!companyId) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-md border bg-muted/30 px-4 py-3">
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Building2 className="h-4 w-4 shrink-0 text-primary" />
        <span>
          Showing jobs from{" "}
          <span className="font-semibold text-foreground">
            {company?.name || "this company"}
          </span>
        </span>
      </p>
      <Button variant="outline" size="sm" onClick={() => setCompanyId("")}>
        <X className="mr-1.5 h-3.5 w-3.5" />
        Clear filter
      </Button>
    </div>
  );
};

export default CompanyFilterBanner;
