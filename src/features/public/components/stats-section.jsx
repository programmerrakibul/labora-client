import Container from "@/components/shared/container";
import StatCard from "@/components/shared/stat-card";
import { platformStats } from "../data/stats";

const StatsSection = () => {
  return (
    <section className="border-y bg-muted/30 py-16">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {platformStats.map((stat) => (
            <StatCard
              key={stat.label}
              title={stat.label}
              value={stat.value}
              icon={stat.icon}
              description={stat.description}
              className="bg-linear-to-br from-background to-primary/5"
              valueClassName="text-3xl text-primary"
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;
