import RoundedCard from "@/components/shared/rounded-card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const CategoryCard = ({
  icon,
  title,
  openPositionsCount,
  bgGradient = "from-primary/10 to-secondary/10",
  href = "/all-jobs",
}) => {
  const Icon = icon;
  return (
    <Link to={href} className="group">
      <RoundedCard className="flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${bgGradient}`}
          >
            <Icon className="h-7 w-7 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold font-heading">{title}</h3>
            <p className="text-sm text-muted-foreground">
              {openPositionsCount} open positions
            </p>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
      </RoundedCard>
    </Link>
  );
};

export default CategoryCard;
