import Container from "@/components/shared/container";
import NotFound from "@/components/shared/not-found";
import { Button } from "@/components/ui/button";
import { COMPANY_STATUS } from "@/constants/enums";
import CompanyCard from "@/features/companies/components/company-card";
import CompanyCardSkeleton from "@/features/companies/components/company-card-skeleton";
import { useCompanies } from "@/features/companies/hooks/use-companies";
import { ArrowRight, Building2 } from "lucide-react";
import { Link } from "react-router";
import SectionHeader from "./section-header";

const TopCompaniesSection = () => {
  const { data, isLoading } = useCompanies({
    limit: 6,
    status: COMPANY_STATUS.ACTIVE,
  });
  const companies = (data?.data || []).slice(0, 6);

  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          badge="Top Hiring Partners"
          title="Companies Hiring on Labora"
          subtitle="Join thousands of top companies and growing startups that trust Labora to find exceptional talent."
          actionButton={
            <Button
              variant="outline"
              render={<Link to={"/companies"} />}
              nativeButton={false}
            >
              <span>View All</span>
              <ArrowRight className="size-4" />
            </Button>
          }
        />
        {isLoading ? (
          <CompanyCardSkeleton count={3} />
        ) : companies.length === 0 ? (
          <NotFound message="No companies yet" icon={Building2} />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {companies.map((company) => (
              <CompanyCard key={company._id} company={company} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

export default TopCompaniesSection;
