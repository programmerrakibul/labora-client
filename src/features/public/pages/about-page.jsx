import Container from "@/components/shared/container";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Handshake } from "lucide-react";

const team = [
  { name: "Rakibul Hasan", role: "Founder & CEO" },
  { name: "Sarah Johnson", role: "CTO" },
  { name: "Mike Chen", role: "Head of Product" },
  { name: "Emma Davis", role: "Head of Design" },
];

const values = [
  { icon: Target, title: "Our Mission", description: "To connect talented professionals with meaningful opportunities worldwide." },
  { icon: Eye, title: "Our Vision", description: "A world where everyone can find work that aligns with their passion and skills." },
  { icon: Handshake, title: "Collaboration", description: "We believe in the power of collaboration and community-driven growth." },
];

const AboutPage = () => {
  return (
    <div>
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight">About Labora</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We are on a mission to revolutionize the way people find and connect with job opportunities.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <Card key={v.title}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <v.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-muted/50 py-16">
        <Container>
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">Meet Our Team</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card key={member.name} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default AboutPage;
