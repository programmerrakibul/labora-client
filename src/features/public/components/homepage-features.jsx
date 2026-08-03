import Container from "@/components/shared/container";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast & Efficient",
    description:
      "Find and apply to jobs in minutes with our streamlined platform.",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description:
      "Every job listing is verified to ensure legitimate opportunities.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Connect with professionals and grow your network.",
  },
];

const HomepageFeatures = () => (
  <section className="py-16">
    <Container>
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Why Choose Labora</h2>
        <p className="mt-2 text-muted-foreground">
          Everything you need to find the perfect job or talent
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="text-center">
            <CardContent className="pt-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  </section>
);

export default HomepageFeatures;
