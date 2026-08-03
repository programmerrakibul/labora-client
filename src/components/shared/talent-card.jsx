import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck, Star } from "lucide-react";

const TalentCard = ({
  name,
  initials,
  title,
  skills = [],
  rate,
  rating,
  avatar,
  verified = true,
}) => {
  return (
    <div className="flex h-full flex-col rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          {avatar ? (
            <AvatarImage src={avatar} alt={name} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
        <div className="min-w-0">
          <h3 className="flex items-center gap-1 font-semibold">
            <span className="truncate">{name}</span>
            {verified && (
              <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />
            )}
          </h3>
          <p className="truncate text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
          >
            {skill}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-1 items-end justify-between gap-2 border-t pt-4">
        <span className="text-sm font-semibold text-primary">{rate}</span>
        <span className="flex items-center gap-1 text-sm font-medium">
          <Star className="h-4 w-4 fill-primary text-primary" />
          {rating}
        </span>
      </div>
    </div>
  );
};

export default TalentCard;
