import Container from "@/components/shared/container";
import EmployerCard from "@/features/public/components/employer-card";
import SectionHeader from "@/features/public/components/section-header";
import { companies } from "../data/companies";

const TopCompaniesSection = () => {
  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          badge="Top Hiring Partners"
          title="Companies Hiring on Labora"
          subtitle="Join thousands of top companies and growing startups that trust Labora to find exceptional talent."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {companies.map((company) => (
            <EmployerCard key={company.name} {...company} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TopCompaniesSection;
