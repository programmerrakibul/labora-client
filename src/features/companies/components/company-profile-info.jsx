import InfoRow from "@/components/shared/info-row";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, Globe, Mail, MapPin, Tags, Users } from "lucide-react";

const CompanyProfileInfo = ({ company }) => {
  const location = [
    company?.location?.city,
    company?.location?.state,
    company?.location?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-4">
          <Avatar className="h-14 w-14 rounded-lg">
            {company?.logo ? (
              <AvatarImage src={company.logo} alt={company.name} />
            ) : null}
            <AvatarFallback className="rounded-lg text-lg">
              {company?.name?.charAt(0) || "C"}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="text-xl">{company?.name}</CardTitle>
              {company?.isVerified ? (
                <Badge variant="secondary">
                  <BadgeCheck className="mr-1 h-3 w-3" />
                  Verified
                </Badge>
              ) : (
                <Badge variant="destructive">Unverified</Badge>
              )}
              <Badge variant="secondary">
                <Users className="mr-1 h-3 w-3" />
                {company?.recruiterCount ?? 0}/{company?.maxRecruiters ?? 5}{" "}
                seats
              </Badge>
            </div>
            {company?.industry && (
              <p className="text-sm text-muted-foreground">
                {company.industry}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {company?.about && (
          <p className="text-sm text-muted-foreground">{company.about}</p>
        )}
        <div className="space-y-2 pt-2">
          {company?.email && <InfoRow icon={Mail}>{company.email}</InfoRow>}
          {company?.website && (
            <InfoRow icon={Globe}>
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                {company.website}
              </a>
            </InfoRow>
          )}
          {location && <InfoRow icon={MapPin}>{location}</InfoRow>}
          {company?.industry && (
            <InfoRow icon={Tags}>{company.industry}</InfoRow>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyProfileInfo;
