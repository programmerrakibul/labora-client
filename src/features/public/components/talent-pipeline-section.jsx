import Container from "@/components/shared/container";
import SectionHeader from "@/features/public/components/section-header";
import { ArrowRight, RotateCcw } from "lucide-react";
import { pipelineStages } from "../data/about";

const TalentPipelineSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeader
          badge="Full Visibility"
          title="Every application, fully trackable"
          subtitle="From the moment you apply to the final offer, candidates and companies always know exactly where things stand."
          centered
        />
        <div className="flex flex-wrap items-center justify-center gap-3">
          {pipelineStages.map((stage, index) => (
            <div key={stage.label} className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border bg-card px-4 py-2.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                <span className="flex size-7 items-center justify-center rounded-full bg-primary/10">
                  <stage.icon className="size-4 text-primary" />
                </span>
                <span className="text-sm font-semibold font-heading">
                  {stage.label}
                </span>
              </div>
              {index < pipelineStages.length - 1 && (
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 flex max-w-xl items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <RotateCcw className="size-4 shrink-0" />
          Candidates can also be rejected or withdraw at any stage — the status
          is always clear.
        </p>
      </Container>
    </section>
  );
};

export default TalentPipelineSection;
