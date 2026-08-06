import Container from "@/components/shared/container";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useAuth from "@/stores/auth";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { useNavigate } from "react-router";

const avatars = [
  { initials: "SA", color: "bg-primary/20 text-primary" },
  { initials: "JC", color: "bg-secondary/20 text-secondary" },
  { initials: "MP", color: "bg-sky-500/20 text-sky-600" },
  { initials: "DK", color: "bg-emerald-500/20 text-emerald-600" },
  { initials: "OS", color: "bg-purple-500/20 text-purple-600" },
];

const HomepageHero = () => {
  const isAuthenticated = useAuth((s) => s.isAuthenticated);
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary/5 to-background py-20 lg:py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Trusted by 48K+ professionals worldwide
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-heading">
            Find Your Next <span className="text-primary">Dream Job</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Connect with top employers and discover opportunities that match
            your skills and aspirations. Your next career move starts here.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" onClick={() => navigate("/all-jobs")}>
              <span>Browse Jobs</span>
              <ArrowRight />
            </Button>
            {!isAuthenticated && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate("/auth/register")}
              >
                <span>Create Account</span>
              </Button>
            )}
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <div className="flex -space-x-2">
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.initials}
                  className="h-9 w-9 ring-2 ring-background"
                >
                  <AvatarFallback
                    className={`text-xs font-semibold ${avatar.color}`}
                  >
                    {avatar.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="font-medium">4.9/5</span>
              <span className="text-muted-foreground">
                from 12K+ verified reviews
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomepageHero;
