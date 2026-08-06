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
    <Link
      to={href}
      className="group flex items-center justify-between gap-4 rounded-lg border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${bgGradient}`}
        >
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {openPositionsCount} open positions
          </p>
        </div>
      </div>
      <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary" />
    </Link>
  );
};

export default CategoryCard;
