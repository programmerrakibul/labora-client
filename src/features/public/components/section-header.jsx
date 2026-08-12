import { Badge } from "@/components/ui/badge";
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
        className,
      )}
    >
      <div className={cn("space-y-2", centered && "text-center")}>
        {badge && (
          <Badge className="uppercase tracking-wide bg-primary/10 text-primary border-primary/20 text-xs font-semibold">
            {badge}
          </Badge>
        )}
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading">
          {title}
        </h2>
        {subtitle && (
          <p
            className={cn(
              "text-muted-foreground text-base",
              centered && "mx-auto max-w-2xl",
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
