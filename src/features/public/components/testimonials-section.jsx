import Container from "@/components/shared/container";
import SectionHeader from "@/features/public/components/section-header";
import TestimonialCard from "@/features/public/components/testimonial-card";
import { testimonials } from "../data/testimonials";

const TestimonialsSection = () => {
  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          badge="Success Stories"
          title="Loved by Talent & Companies"
          subtitle="Real stories from real people who found success on Labora."
          centered
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
