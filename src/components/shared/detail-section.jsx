const DetailSection = ({ icon, title, children }) => {
  const Icon = icon;
  return (
    <section className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-muted text-muted-foreground">
          <Icon className="h-3.5 w-3.5" />
        </span>
        {title}
      </h3>
      {children}
    </section>
  );
};

export default DetailSection;
