const CtaBannerSection = () => {
  return (
    <section className="mt-12">
      <div className="rounded-2xl bg-primary/70 p-12 text-primary-foreground shadow-md">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl font-heading">
            Make the next move
            <br />
            <span className="block text-2xl font-semibold">
              with more signal.
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base opacity-90">
            Everyone starts, creates a team, or simply starts where they are.
            Labora is built to help you take the next useful step.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaBannerSection;
