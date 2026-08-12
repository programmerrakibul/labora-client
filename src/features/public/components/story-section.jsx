import Container from "@/components/shared/container";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeader from "@/features/public/components/section-header";
import { mission, values, vision } from "../data/about";

const StorySection = () => {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80"
                alt="The Labora team collaborating in a meeting"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 -right-4 hidden w-52 overflow-hidden rounded-2xl border-4 border-background shadow-lg md:block lg:-right-8">
              <img
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=600&q=80"
                alt="Team members reviewing work on a laptop"
                className="aspect-square w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -top-4 left-4 rounded-xl border bg-card px-4 py-2 shadow-md">
              <p className="text-sm font-bold font-heading text-primary">
                Trusted by 48K+
              </p>
              <p className="text-xs text-muted-foreground">
                professionals worldwide
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <SectionHeader
              badge="Our Story"
              title="Built to make hiring human again"
              subtitle="Labora started with a simple frustration: finding great work — or great people — shouldn't take months. We set out to build a marketplace where trust, transparency and speed do the heavy lifting."
              className="mb-0"
            />
            <p className="text-muted-foreground">
              Today, thousands of job seekers and verified companies rely on
              Labora every day. From one-click applications to fully tracked
              hiring pipelines, we keep the entire journey clear, fair and
              fast — so people can focus on what matters most: doing great
              work.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardContent className="flex flex-col gap-3 pt-6">
                  <div className="flex size-11 items-center justify-center rounded-full bg-primary/10">
                    <mission.icon className="size-5 text-primary" />
                  </div>
                  <h3 className="font-semibold font-heading">{mission.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {mission.description}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col gap-3 pt-6">
                  <div className="flex size-11 items-center justify-center rounded-full bg-primary/10">
                    <vision.icon className="size-5 text-primary" />
                  </div>
                  <h3 className="font-semibold font-heading">{vision.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {vision.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <Card
              key={value.title}
              className="transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <CardContent className="flex flex-col gap-3 pt-6">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="size-5 text-primary" />
                </div>
                <h3 className="font-semibold font-heading">{value.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StorySection;
