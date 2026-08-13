import Container from "@/components/shared/container";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useAuth from "@/stores/auth";
import { ArrowRight, BadgeCheck, Sparkles, Star } from "lucide-react";
import { Link } from "react-router";

const avatars = [
  { initials: "SA", className: "bg-primary/20 text-primary" },
  { initials: "JC", className: "bg-secondary/20 text-secondary" },
  { initials: "MP", className: "bg-sky-500/20 text-sky-600" },
  { initials: "DK", className: "bg-emerald-500/20 text-emerald-600" },
  { initials: "OS", className: "bg-purple-500/20 text-purple-600" },
];

const AboutHero = () => {
  const isAuthenticated = useAuth((s) => s.isAuthenticated);

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-primary/5 to-background py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-6">
            <Badge className="border-primary/20 bg-primary/10 text-primary">
              <Sparkles className="size-3.5" />
              About Labora
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl font-heading">
              Where <span className="text-primary">talent</span> meets{" "}
              <span className="text-primary">opportunity</span>
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Labora is a freelance job marketplace built on trust. We connect
              job seekers with verified companies — and give every team the
              tools to hire with confidence.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                render={<Link to="/all-jobs" />}
                nativeButton={false}
              >
                <span>Browse Jobs</span>
                <ArrowRight data-icon="inline-end" />
              </Button>
              {!isAuthenticated && (
                <Button
                  variant="outline"
                  size="lg"
                  nativeButton={false}
                  render={<Link to="/auth/register" />}
                >
                  <span>Join for Free</span>
                </Button>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="flex">
                {avatars.map((avatar, index) => (
                  <Avatar
                    key={avatar.initials}
                    className={cn(
                      "size-9 ring-2 ring-background",
                      index > 0 && "-ml-2",
                    )}
                  >
                    <AvatarFallback
                      className={cn("text-xs font-semibold", avatar.className)}
                    >
                      {avatar.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <span className="font-medium">4.9/5</span>
                <span className="text-muted-foreground">from 12K+ reviews</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl border shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="A collaborative team working together at Labora"
                className="aspect-4/3 w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-xl border bg-card p-3 pr-4 shadow-md sm:left-6">
              <div className="flex">
                {avatars.slice(0, 4).map((avatar, index) => (
                  <Avatar
                    key={avatar.initials}
                    className={cn(
                      "size-7 ring-2 ring-card",
                      index > 0 && "-ml-1.5",
                    )}
                  >
                    <AvatarFallback
                      className={cn(
                        "text-[10px] font-semibold",
                        avatar.className,
                      )}
                    >
                      {avatar.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div>
                <p className="text-sm font-bold font-heading">
                  48K+ talents hired
                </p>
                <p className="text-xs text-muted-foreground">
                  and growing every day
                </p>
              </div>
            </div>
            <div className="absolute -top-4 right-4 hidden items-center gap-2 rounded-xl border bg-card px-3 py-2 shadow-md sm:flex">
              <BadgeCheck className="size-5 text-primary" />
              <div>
                <p className="text-sm font-bold font-heading">
                  Verified companies
                </p>
                <p className="text-xs text-muted-foreground">
                  3.5K+ hiring partners
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutHero;
