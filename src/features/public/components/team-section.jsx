import Container from "@/components/shared/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SectionHeader from "@/features/public/components/section-header";
import { team } from "../data/about";

const TeamSection = () => {
  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeader
          badge="Our Team"
          title="Meet the people behind Labora"
          subtitle="A small, driven team obsessed with making work better for everyone."
          centered
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center gap-4 rounded-xl border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <Avatar className="size-20">
                <AvatarImage src={member.image} alt={member.name} />
                <AvatarFallback className="text-xl">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold font-heading">{member.name}</h3>
                <p className="text-sm font-medium text-primary">
                  {member.role}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TeamSection;
