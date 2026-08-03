import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import TalentCard from "@/components/shared/talent-card";
import { talents } from "../data/talents";

const TalentSpotlightSection = () => {
  return (
    <section className="bg-muted/50 py-16">
      <Container>
        <SectionHeader
          badge="Talent Spotlight"
          title="Meet Top Verified Freelancers"
          subtitle="Exceptional professionals ready to bring their skills to your next project. Hire them today."
          centered
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {talents.map((talent) => (
            <TalentCard key={talent.name} {...talent} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TalentSpotlightSection;
