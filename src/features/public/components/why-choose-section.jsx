import Container from "@/components/shared/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useNavigate } from "react-router";
import { features } from "../data/about";

const checklist = [
  "Zero cost for job seekers — apply freely",
  "Company roles audited by owners, not crowds",
  "Seat-based recruiting teams keep hiring accountable",
];

const WhyChooseSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-muted/50 py-16 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-5 lg:items-start">
          <div className="flex flex-col items-start gap-6 lg:sticky lg:top-8 lg:col-span-2">
            <Badge className="border-primary/20 bg-primary/10 text-primary">
              Why Labora
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading">
              Built for the way modern teams &amp; talent work
            </h2>
            <p className="text-muted-foreground">
              Labora combines verified companies, honest salaries and a
              transparent pipeline — so hiring feels fast, fair and human
              again.
            </p>
            <ul className="flex flex-col gap-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Check className="size-3 text-primary" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button onClick={() => navigate("/auth/register")}>
              <span>Get Started Free</span>
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col gap-3 rounded-xl border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex size-11 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="size-5 text-primary" />
                </div>
                <h3 className="font-semibold font-heading">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseSection;
