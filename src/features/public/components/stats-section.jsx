import Container from "@/components/shared/container";
import StatCard from "@/features/public/components/stat-card";
import { platformStats } from "../data/stats";

const StatsSection = () => {
  return (
    <section className="py-12 lg:py-16">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {platformStats.map((stat) => (
              <StatCard
                key={stat.label}
                title={stat.label}
                value={stat.value}
                icon={stat.icon}
                description={stat.description}
                className="bg-card"
                valueClassName="text-2xl text-primary"
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;
