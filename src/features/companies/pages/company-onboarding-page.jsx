import Container from "@/components/shared/container";
import Seo from "@/components/shared/seo";
import Skeleton from "@/components/shared/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth, { fetchSession } from "@/stores/auth";
import { Building2, Clock, Loader2, UserPlus, X } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useCancelJoinRequest, useMyMembership } from "../hooks/use-companies";

const CompanyOnboardingPage = () => {
  const navigate = useNavigate();
  const user = useAuth((s) => s.user);
  const cancelRequest = useCancelJoinRequest();
  const { data: membership, isLoading } = useMyMembership({
    refetchInterval: 15000,
  });

  const membershipStatus = membership?.data?.status;
  const isCompanyUser =
    user?.role === "COMPANY_OWNER" || user?.role === "COMPANY_MEMBER";

  useEffect(() => {
    if (isCompanyUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [isCompanyUser, navigate]);

  useEffect(() => {
    if (membershipStatus === "active" && !isCompanyUser) {
      fetchSession();
    }
  }, [membershipStatus, isCompanyUser]);

  const handleCancelRequest = async () => {
    const companyId = membership?.data?.companyId;
    if (!companyId) return;

    await cancelRequest.mutateAsync(companyId);
  };

  return (
    <Container className="py-8">
      <Seo
        title="Company Onboarding"
        noindex
        description="Create a company or join an existing one on Labora."
      />
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Company Onboarding
        </h1>
        <p className="text-muted-foreground">
          Set up your company or join an existing team
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      ) : membershipStatus === "active" ? (
        <Card className="mx-auto max-w-xl">
          <CardContent className="flex items-center justify-center gap-3 pt-6">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              You are already part of a company. Redirecting to your
              dashboard...
            </p>
          </CardContent>
        </Card>
      ) : membershipStatus === "pending" ? (
        <Card className="mx-auto max-w-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-warning" />
              Request pending approval
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 rounded-md border bg-muted/30 p-4">
              <Avatar className="h-12 w-12 rounded-lg">
                {membership?.data?.company?.logo ? (
                  <AvatarImage
                    src={membership.data.company.logo}
                    alt={membership.data.company.name}
                  />
                ) : null}
                <AvatarFallback className="rounded-lg">
                  {membership?.data?.company?.name?.charAt(0) || "C"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">
                  {membership?.data?.company?.name || "Your company"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Your request to join is awaiting approval from the company
                  owner. You will be notified here once it is approved.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                variant="destructive"
                onClick={handleCancelRequest}
                disabled={cancelRequest.isPending}
              >
                {cancelRequest.isPending ? (
                  <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                ) : (
                  <X className="mr-1.5 h-4 w-4" />
                )}
                Cancel request
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="mx-auto max-w-2xl space-y-6">
          <p className="text-center text-muted-foreground">
            You are not affiliated with a company yet. How would you like to get
            started?
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link to="/dashboard/company/create">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Create a Company</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Own your company profile on Labora. Post jobs, review
                    applications, and build your team.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/dashboard/company/join">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20">
                    <UserPlus className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Join a Company</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Request to join an existing company and start posting jobs
                    on its behalf once approved.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CompanyOnboardingPage;
