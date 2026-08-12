import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2, MapPin, Users } from "lucide-react";

const CompanyLogo = ({ company, className = "h-12 w-12" }) => {
  const initials = (company?.name || "C")
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <Avatar className={`rounded-lg ${className}`}>
      {company?.logo ? (
        <AvatarImage src={company.logo} alt={company.name} />
      ) : null}
      <AvatarFallback className="rounded-lg text-base">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

const CompanyCard = ({ company, onJoin, isJoining = false }) => {
  const seatsFilled = company?.recruiterCount ?? 0;
  const maxRecruiters = company?.maxRecruiters ?? 5;
  const isFull = seatsFilled >= maxRecruiters;
  const location = [company?.location?.city, company?.location?.country]
    .filter(Boolean)
    .join(", ");

  return (
    <Card className="flex h-full flex-col transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <CompanyLogo company={company} />
            <div className="min-w-0">
              <h3 className="truncate font-semibold">{company?.name}</h3>
              {company?.industry && (
                <p className="truncate text-sm text-muted-foreground">
                  {company.industry}
                </p>
              )}
            </div>
          </div>
          <Badge
            variant="secondary"
            className={isFull ? "bg-destructive/10 text-destructive" : ""}
          >
            <Users className="mr-1 h-3 w-3" />
            {seatsFilled}/{maxRecruiters} seats
          </Badge>
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
        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {location || "Location not specified"}
          </p>
          <Button
            type="button"
            size="sm"
            onClick={() => onJoin(company._id)}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
