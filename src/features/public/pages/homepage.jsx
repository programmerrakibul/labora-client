import Container from "@/components/shared/container";
import { CardSkeleton } from "@/components/shared/skeletons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import JobCard from "@/features/jobs/components/job-card";
import { useJobs } from "@/features/jobs/hooks/use-jobs";
import { ArrowRight, Shield, Users, Zap } from "lucide-react";
import { Link } from "react-router";

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

const stats = [
  { label: "Active Jobs", value: "100+" },
  { label: "Skilled Workers", value: "500+" },
  { label: "Employers", value: "50+" },
  { label: "Success Rate", value: "95%" },
];

const Homepage = () => {
  const { data, isLoading } = useJobs({ limit: 6, status: "ACTIVE" });
  const jobs = data?.data || [];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-primary/5 to-background py-20 lg:py-32">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Find Your Next <span className="text-primary">Dream Job</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Connect with top employers and discover opportunities that match
              your skills and aspirations.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg">
                <Link
                  to="/all-jobs"
                  className="flex items-center justify-center gap-2"
                >
                  <span>Browse Jobs</span>
                  <ArrowRight />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link to="/auth/register">Create Account</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-y py-12">
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-16">
        <Container>
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Why Choose Labora
            </h2>
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

      {/* Latest Jobs */}
      <section className="bg-muted/50 py-16">
        <Container>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Latest Jobs</h2>
              <p className="mt-1 text-muted-foreground">
                Explore the newest opportunities
              </p>
            </div>
            <Button variant="outline">
              <Link to="/all-jobs">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          {isLoading ? (
            <CardSkeleton count={6} />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
};

export default Homepage;
