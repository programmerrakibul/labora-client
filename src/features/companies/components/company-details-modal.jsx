import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, X } from "lucide-react";
import { Link } from "react-router";
import CompanyProfileInfo from "./company-profile-info";

const CompanyDetailsModal = ({
  company,
  open,
  onOpenChange,
  showJoin = false,
  onJoin,
  isJoining = false,
}) => {
  if (!open) return null;

  const seatsFilled = company?.recruiterCount ?? 0;
  const maxRecruiters = company?.maxRecruiters ?? 5;
  const isFull = seatsFilled >= maxRecruiters;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-2xl p-0">
      <div className="overflow-hidden rounded-lg">
        <ScrollArea className="max-h-[85dvh] w-full">
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b bg-background px-5 py-4 sm:px-6">
            <DialogTitle className="pt-1 text-lg sm:text-xl">
              Company Details
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-muted-foreground"
              onClick={() => onOpenChange(false)}
              aria-label="Close company details"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-5 px-5 py-5 sm:px-6 sm:py-6">
            <CompanyProfileInfo company={company} />

            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                render={<Link to={`/all-jobs?companyId=${company?._id}`} />}
                nativeButton={false}
                onClick={() => onOpenChange(false)}
              >
                View Jobs
              </Button>
              {showJoin && (
                <Button
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
        </ScrollArea>
      </div>
    </Dialog>
  );
};

export default CompanyDetailsModal;
