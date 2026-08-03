const DetailItem = ({ icon, label, value }) => {
  const Icon = icon;
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted/70 text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 wrap-break-word text-sm font-medium text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
};

export default DetailItem;
