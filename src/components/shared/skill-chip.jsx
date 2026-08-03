import { cn } from "@/lib/utils";

const SkillChip = ({ skill, size = "sm", className = "" }) => (
  <span
    className={cn(
      "rounded-full bg-secondary text-secondary-foreground",
      size === "md" ? "px-3 py-1 text-sm" : "px-2 py-0.5 text-xs",
      className,
    )}
  >
    {skill}
  </span>
);

export default SkillChip;
