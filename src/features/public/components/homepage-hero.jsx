import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import useAuth from "@/stores/auth";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import HeroMedia from "./hero-media";

const HomepageHero = () => {
  const isAuthenticated = useAuth((s) => s.isAuthenticated);
  const navigate = useNavigate();

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6 xl:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
              Trusted by 48K+ professionals worldwide
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-heading">
              The right next move
              <br /> should feel
              <span className="block text-primary">possible.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              We build a clearer, more human way for people to find work — and
              for teams to find the people who make the work matter.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={() => navigate("/all-jobs")}>
                Explore Jobs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              {!isAuthenticated && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/auth/register")}
                >
                  Create Account
                </Button>
              )}
            </div>
          </div>

          <div className="lg:col-span-6 xl:col-span-5">
            <HeroMedia />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomepageHero;
