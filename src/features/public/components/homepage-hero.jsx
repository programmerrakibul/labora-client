import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const HomepageHero = () => (
  <section className="relative overflow-hidden bg-linear-to-b from-primary/5 to-background py-20 lg:py-32">
    <Container>
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Find Your Next <span className="text-primary">Dream Job</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Connect with top employers and discover opportunities that match your
          skills and aspirations.
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
);

export default HomepageHero;
