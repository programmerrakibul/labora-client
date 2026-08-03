import { cn } from "@/lib/utils";

const InfoRow = ({ icon: Icon, children, className = "" }) => (
  <div className={cn("flex items-center gap-2 text-sm", className)}>
    {Icon && <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />}
    <span className="min-w-0">{children}</span>
  </div>
);

export default InfoRow;
