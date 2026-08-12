const StepCard = ({ step, icon, title, description }) => {
  const Icon = icon;
  return (
    <div className="relative">
      <div className="absolute right-5 top-5 text-4xl font-bold text-muted/50">
        {step}
      </div>
      <div className="mt-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold font-heading">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
};

export default StepCard;
