import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Loader2, MapPin, Users } from "lucide-react";
import { Link } from "react-router";

const getInitials = (name) =>
  (name || "C")
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

const CompanyCard = ({
  company,
  showSeats = false,
  showJoin = false,
  showDetails = false,
  isJoining = false,
  onJoin,
  onViewDetails,
  className,
}) => {
  const seatsFilled = company?.recruiterCount ?? 0;
  const maxRecruiters = company?.maxRecruiters ?? 5;
  const isFull = seatsFilled >= maxRecruiters;
  const location = [company?.location?.city, company?.location?.country]
    .filter(Boolean)
    .join(", ");

  return (
    <Card
      className={cn(
        "flex h-full flex-col transition-shadow hover:shadow-md",
        className,
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar className="h-12 w-12 rounded-lg">
              {company?.logo ? (
                <AvatarImage src={company.logo} alt={company.name} />
              ) : null}
              <AvatarFallback className="rounded-lg text-base">
                {getInitials(company?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h3 className="truncate font-semibold">{company?.name}</h3>
              {company?.industry && (
                <p className="truncate text-sm text-muted-foreground">
                  {company.industry}
                </p>
              )}
            </div>
          </div>
          {showSeats && (
            <Badge
              variant="secondary"
              className={cn(
                "shrink-0",
                isFull && "bg-destructive/10 text-destructive",
              )}
            >
              <Users className="mr-1 h-3 w-3" />
              {seatsFilled}/{maxRecruiters} seats
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        {company?.about ? (
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {company.about}
          </p>
        ) : (
          <div className="flex-1" />
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {location || "Location not specified"}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              render={<Link to={`/all-jobs?companyId=${company?._id}`} />}
            >
              View Jobs
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>

            {showDetails && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewDetails(company)}
              >
                Details
              </Button>
            )}

            {showJoin && (
              <Button
                size="sm"
                onClick={() => onJoin(company?._id)}
                disabled={isFull || isJoining}
              >
                {isJoining ? (
                  <>
                    <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : isFull ? (
                  "Full"
                ) : (
                  "Request to Join"
                )}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
