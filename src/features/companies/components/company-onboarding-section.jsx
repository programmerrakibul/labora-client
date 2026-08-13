import Container from "@/components/shared/container";
import SectionHeader from "@/features/public/components/section-header";
import Skeleton from "@/components/shared/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth, { fetchSession } from "@/stores/auth";
import { Building2, Clock, Loader2, UserPlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CreateCompanyDialog from "./create-company-dialog";
import { useCancelJoinRequest, useMyMembership } from "../hooks/use-companies";

const CompanyOnboardingSection = () => {
  const navigate = useNavigate();
  const user = useAuth((s) => s.user);
  const [createOpen, setCreateOpen] = useState(false);
  const cancelRequest = useCancelJoinRequest();
  const { data: membership, isLoading } = useMyMembership({
    refetchInterval: 15000,
    enabled: user?.role === "JOB_SEEKER",
  });

  const membershipStatus = membership?.data?.status;
  const isJobSeeker = user?.role === "JOB_SEEKER";

  useEffect(() => {
    if (membershipStatus === "active" && isJobSeeker) {
      fetchSession();
    }
  }, [membershipStatus, isJobSeeker]);

  if (!isJobSeeker) return null;

  const handleCancelRequest = async () => {
    const companyId = membership?.data?.companyId;
    if (!companyId) return;

    await cancelRequest.mutateAsync(companyId);
  };

  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          badge="Company Onboarding"
          title="Grow Your Business on Labora"
          subtitle="Create a company or join an existing team to start posting jobs and hiring talent."
        />

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Skeleton className="h-44 w-full" />
            <Skeleton className="h-44 w-full" />
          </div>
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
        ) : membershipStatus === "active" ? (
          <Card className="mx-auto max-w-xl">
            <CardContent className="flex items-center justify-center gap-3 pt-6">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">
                You are already part of a company. Syncing your session...
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="mx-auto max-w-2xl space-y-6">
            <p className="text-center text-muted-foreground">
              You are not affiliated with a company yet. How would you like to
              get started?
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setCreateOpen(true)}
                className="flex h-full flex-col rounded-lg border bg-card p-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold font-heading">
                  Create a Company
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Own your company profile on Labora. Post jobs, review
                  applications, and build your team.
                </p>
              </button>
              <button
                type="button"
                onClick={() => navigate("/companies")}
                className="flex h-full flex-col rounded-lg border bg-card p-6 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/20">
                  <UserPlus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold font-heading">
                  Join a Company
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Request to join an existing company and start posting jobs on
                  its behalf once approved.
                </p>
              </button>
            </div>
          </div>
        )}
      </Container>

      <CreateCompanyDialog open={createOpen} onOpenChange={setCreateOpen} />
    </section>
  );
};

export default CompanyOnboardingSection;
