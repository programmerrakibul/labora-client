import Container from "./container";

const SectionContainer = ({ children, className = "py-16" }) => {
  return (
    <section className={className}>
      <Container>{children}</Container>
    </section>
  );
};

export default SectionContainer;
