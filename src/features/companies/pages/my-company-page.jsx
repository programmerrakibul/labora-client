import Container from "@/components/shared/container";
import InfoRow from "@/components/shared/info-row";
import NotFound from "@/components/shared/not-found";
import Seo from "@/components/shared/seo";
import Skeleton from "@/components/shared/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useAuth from "@/stores/auth";
import { Building2, Globe, LogOut, MapPin, Tags, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import CompanyForm from "../components/company-form";
import MembersTable from "../components/members-table";
import PendingRequestsTable from "../components/pending-requests-table";
import {
  useCompany,
  useLeaveCompany,
  useUpdateCompany,
} from "../hooks/use-companies";

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

const MyCompanyPage = () => {
  const navigate = useNavigate();
  const user = useAuth((s) => s.user);
  const isOwner = user?.role === "COMPANY_OWNER";
  const companyId = user?.companyId;
  const [leaveOpen, setLeaveOpen] = useState(false);

  const { data: company, isLoading } = useCompany(companyId);
  const updateCompany = useUpdateCompany();
  const leaveCompany = useLeaveCompany();

  const handleUpdate = async (payload) => {
    await updateCompany.mutateAsync({ id: companyId, ...payload });
  };

  const handleLeave = async () => {
    await leaveCompany.mutateAsync();
    setLeaveOpen(false);
    navigate("/dashboard");
  };

  if (isLoading) {
    return (
      <Container className="py-8">
        <div className="space-y-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </Container>
    );
  }

  if (!company) {
    return (
      <Container className="py-8">
        <Seo title="My Company" noindex />
        <NotFound
          message="Company not found"
          icon={Building2}
          actionLabel="Go to Dashboard"
          action={() => navigate("/dashboard")}
        />
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <Seo
        title="My Company"
        noindex
        description="Manage your company profile on Labora."
      />
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">My Company</h1>
        <p className="text-muted-foreground">
          {isOwner
            ? "Manage your company profile and team"
            : "View your company details"}
        </p>
      </div>

      <div className="space-y-6">
        <CompanyProfileInfo company={company} />

        {isOwner ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Edit Company</CardTitle>
              </CardHeader>
              <CardContent>
                <CompanyForm
                  initialCompany={company}
                  onSubmit={handleUpdate}
                  isSubmitting={updateCompany.isPending}
                  onCancel={() => navigate("/dashboard")}
                  submitLabel="Save Changes"
                  loadingLabel="Saving..."
                />
              </CardContent>
            </Card>
            <PendingRequestsTable companyId={companyId} />
            <MembersTable companyId={companyId} />
          </>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-start gap-3 pt-6">
              <p className="text-sm text-muted-foreground">
                Need to leave this company? You can leave at any time. Your role
                will revert to a job seeker.
              </p>
              <Button variant="destructive" onClick={() => setLeaveOpen(true)}>
                <LogOut className="mr-2 h-4 w-4" />
                Leave Company
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={leaveOpen} onOpenChange={setLeaveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Leave Company</DialogTitle>
            <DialogDescription>
              Are you sure you want to leave {company.name}? You will lose
              access to company job posting features and your role will revert
              to a job seeker.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLeaveOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleLeave}
              disabled={leaveCompany.isPending}
            >
              {leaveCompany.isPending ? "Leaving..." : "Leave Company"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default MyCompanyPage;
