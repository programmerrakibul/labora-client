import Container from "@/components/shared/container";

const stats = [
  { label: "Active Jobs", value: "100+" },
  { label: "Skilled Workers", value: "500+" },
  { label: "Employers", value: "50+" },
  { label: "Success Rate", value: "95%" },
];

const HomepageStats = () => (
  <section className="border-y py-12">
    <Container>
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-primary">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </Container>
  </section>
);

export default HomepageStats;
