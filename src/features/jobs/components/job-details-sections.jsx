import SkillChip from "@/components/shared/skill-chip";

const Section = ({ title, children }) => (
  <div>
    <h2 className="mb-2 text-lg font-semibold">{title}</h2>
    {children}
  </div>
);

const JobDetailsSections = ({ job }) => (
  <>
    <Section title="Description">
      <p className="whitespace-pre-line text-muted-foreground">
        {job.description}
      </p>
    </Section>

    {job.requirements?.length > 0 && (
      <Section title="Requirements">
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          {job.requirements.map((req, i) => (
            <li key={i}>{req}</li>
          ))}
        </ul>
      </Section>
    )}

    {job.responsibilities?.length > 0 && (
      <Section title="Responsibilities">
        <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
          {job.responsibilities.map((resp, i) => (
            <li key={i}>{resp}</li>
          ))}
        </ul>
      </Section>
    )}

    {job.skills?.length > 0 && (
      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <SkillChip key={skill} skill={skill} size="md" />
          ))}
        </div>
      </Section>
    )}
  </>
);

export default JobDetailsSections;
