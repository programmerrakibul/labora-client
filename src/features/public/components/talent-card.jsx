import RoundedCard from "@/components/shared/rounded-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
    <RoundedCard className="flex h-full flex-col p-6">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          {avatar ? (
            <AvatarImage src={avatar} alt={name} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
        <div className="min-w-0">
          <h3 className="flex items-center gap-1 font-semibold font-heading">
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
          <Badge key={skill} variant="secondary">
            {skill}
          </Badge>
        ))}
      </div>
      <div className="mt-4 flex flex-1 items-end justify-between gap-2 border-t pt-4">
        <span className="text-sm font-semibold text-primary">{rate}</span>
        <span className="flex items-center gap-1 text-sm font-medium">
          <Star className="h-4 w-4 fill-primary text-primary" />
          {rating}
        </span>
      </div>
    </RoundedCard>
  );
};

export default TalentCard;
