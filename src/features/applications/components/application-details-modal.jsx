import DetailItem from "@/components/shared/detail-item";
import DetailSection from "@/components/shared/detail-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { APPLICATION_STATUS, getEnumByValue } from "@/constants/enums";
import { formatPostedAt } from "@/features/jobs/utils/job";
import {
  Briefcase,
  Building2,
  CalendarClock,
  DollarSign,
  FileText,
  Mail,
  MapPin,
  Phone,
  User,
  X,
} from "lucide-react";

const ApplicationDetailsModal = ({ application, open, onOpenChange }) => {
  if (!open) return null;

  if (!application) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange} className="max-w-3xl p-0">
        <div className="overflow-hidden rounded-lg">
          <div className="flex flex-col items-center gap-3 p-10 text-center">
            <p className="text-muted-foreground">Application not found</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    );
  }

  const status = getEnumByValue(APPLICATION_STATUS, application.status);
  const job = application.jobId || {};
  const applicant = application.applicantId || {};
  const applicantLocation = [applicant.city, applicant.country]
    .filter(Boolean)
    .join(", ");

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-3xl p-0">
      <div className="overflow-hidden rounded-lg">
        <ScrollArea className="max-h-[85dvh] w-full">
          <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b bg-background px-5 py-4 sm:px-6 sm:py-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-base font-bold text-primary">
                {applicant.name?.charAt(0)?.toUpperCase() || "A"}
              </div>
              <div className="min-w-0">
                <DialogTitle className="truncate text-lg sm:text-xl">
                  {job.title || "Application Details"}
                </DialogTitle>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4 shrink-0" />
                  <span className="truncate">{job.company || "N/A"}</span>
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 text-muted-foreground"
              onClick={() => onOpenChange(false)}
              aria-label="Close application details"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6 px-5 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-wrap gap-2">
              {status && (
                <Badge variant="secondary" className={status.color}>
                  {status.label}
                </Badge>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <DetailSection icon={User} title="Applicant">
                <div className="space-y-2">
                  <DetailItem
                    icon={User}
                    label="Name"
                    value={applicant.name || "N/A"}
                  />
                  <DetailItem
                    icon={Mail}
                    label="Email"
                    value={applicant.email || "N/A"}
                  />
                  {applicant.phoneNumber && (
                    <DetailItem
                      icon={Phone}
                      label="Phone"
                      value={applicant.phoneNumber}
                    />
                  )}
                  {applicantLocation && (
                    <DetailItem
                      icon={MapPin}
                      label="Location"
                      value={applicantLocation}
                    />
                  )}
                </div>
              </DetailSection>

              <DetailSection icon={Briefcase} title="Job">
                <div className="space-y-2">
                  <DetailItem
                    icon={Briefcase}
                    label="Title"
                    value={job.title || "N/A"}
                  />
                  <DetailItem
                    icon={Building2}
                    label="Company"
                    value={job.company || "N/A"}
                  />
                </div>
              </DetailSection>
            </div>

            <Separator />

            <DetailSection icon={FileText} title="Application">
              <div className="grid gap-5 sm:grid-cols-2">
                <DetailItem
                  icon={DollarSign}
                  label="Expected Salary"
                  value={
                    application.expectedSalary != null
                      ? application.expectedSalary.toLocaleString()
                      : "Not specified"
                  }
                />
                <DetailItem
                  icon={CalendarClock}
                  label="Applied"
                  value={
                    application.createdAt
                      ? formatPostedAt(application.createdAt)
                      : "N/A"
                  }
                />
              </div>
            </DetailSection>

            {application.resumeUrl && (
              <DetailSection icon={FileText} title="Resume">
                <a
                  href={application.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-sm font-medium text-primary hover:underline"
                >
                  {application.resumeUrl}
                </a>
              </DetailSection>
            )}

            {application.coverLetter && (
              <DetailSection icon={FileText} title="Cover Letter">
                <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {application.coverLetter}
                </p>
              </DetailSection>
            )}

            <p className="text-xs text-muted-foreground">
              Application ID: {application._id}
            </p>
          </div>
        </ScrollArea>
      </div>
    </Dialog>
  );
};

export default ApplicationDetailsModal;
