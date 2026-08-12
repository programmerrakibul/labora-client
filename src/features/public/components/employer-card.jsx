import RoundedCard from "@/components/shared/rounded-card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Star } from "lucide-react";
import { Link } from "react-router";

const EmployerCard = ({
  name,
  initials,
  industry,
  openPositions,
  rating,
  location,
  bgGradient = "from-primary to-secondary",
}) => {
  return (
    <Link to="/all-jobs" className="group">
      <RoundedCard className="flex h-full flex-col p-6">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br ${bgGradient} text-lg font-bold text-white`}
          >
            {initials}
          </div>
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
            <Star className="h-3 w-3 fill-primary" />
            {rating}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-semibold font-heading">{name}</h3>
        <p className="text-sm text-muted-foreground">{industry}</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          {location}
        </p>
        <div className="mt-4 flex flex-1 items-end justify-between gap-2 border-t pt-4">
          <Badge variant="secondary">{openPositions} open roles</Badge>
          <span className="flex items-center gap-1 text-sm font-medium text-primary">
            View jobs
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </RoundedCard>
    </Link>
  );
};

export default EmployerCard;
