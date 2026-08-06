import { cn } from "@/lib/utils";

const SectionHeader = ({
  badge,
  title,
  subtitle,
  centered = false,
  actionButton,
  className,
}) => {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        centered && "sm:flex-col sm:items-center",
        className
      )}
    >
      <div className={cn("space-y-2", centered && "text-center")}>
        {badge && (
          <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {badge}
          </span>
        )}
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              "text-muted-foreground",
              centered && "mx-auto max-w-2xl"
            )}
          >
            {subtitle}
          </p>
        )}
      </div>
      {actionButton}
    </div>
  );
};

export default SectionHeader;
