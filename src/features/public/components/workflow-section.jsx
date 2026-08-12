import Container from "@/components/shared/container";
import SectionHeader from "@/features/public/components/section-header";
import StepCard from "@/features/public/components/step-card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { employerSteps, jobSeekerSteps } from "../data/workflow";

const tabs = [
  { id: "jobSeekers", label: "For Job Seekers" },
  { id: "employers", label: "For Employers" },
];

const WorkflowSection = () => {
  const [activeTab, setActiveTab] = useState("jobSeekers");
  const steps = activeTab === "jobSeekers" ? jobSeekerSteps : employerSteps;

  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          badge="How It Works"
          title="A Smarter Way to Find Work & Talent"
          subtitle="Whether you are growing your career or scaling your team, Labora makes every step effortless."
          centered
        />
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-full border bg-background p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <StepCard key={step.step} {...step} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WorkflowSection;
