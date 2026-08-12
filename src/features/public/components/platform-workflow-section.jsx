import Container from "@/components/shared/container";
import SectionHeader from "@/features/public/components/section-header";
import StepCard from "@/features/public/components/step-card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { companySteps, talentSteps } from "../data/about";

const tabs = [
  { id: "talent", label: "For Talent" },
  { id: "companies", label: "For Companies" },
];

const PlatformWorkflowSection = () => {
  const [activeTab, setActiveTab] = useState("talent");
  const steps = activeTab === "talent" ? talentSteps : companySteps;

  return (
    <section className="bg-muted/50 py-16 lg:py-24">
      <Container>
        <SectionHeader
          badge="How Labora Works"
          title="A clear path from first click to hired"
          subtitle="Whether you're growing your career or scaling your team, every step is simple, transparent and built to get you results."
          centered
        />
        <div className="mb-12 flex justify-center">
          <div className="inline-flex rounded-full border bg-background p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-full px-6 py-2 text-sm font-semibold transition-all duration-300",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <StepCard key={step.step} {...step} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PlatformWorkflowSection;
