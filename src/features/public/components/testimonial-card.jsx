import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck, Quote, Star } from "lucide-react";

const TestimonialCard = ({
  quote,
  rating = 5,
  name,
  initials,
  role,
  company,
  avatar,
  verified = true,
}) => {
  return (
    <div className="flex h-full flex-col rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <Quote className="h-8 w-8 text-primary/20" />
      <div className="mt-4 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? "fill-primary text-primary" : "text-muted"
            }`}
          />
        ))}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-3 border-t pt-4">
        <Avatar className="h-10 w-10">
          {avatar ? (
            <AvatarImage src={avatar} alt={name} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <p className="flex items-center gap-1 text-sm font-semibold font-heading">
            {name}
            {verified && <BadgeCheck className="h-4 w-4 text-primary" />}
          </p>
          <p className="text-xs text-muted-foreground">
            {role} at {company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
