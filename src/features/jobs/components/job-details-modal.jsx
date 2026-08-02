import Skeleton from "@/components/shared/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  EXPERIENCE_LEVEL,
  getEnumByValue,
  JOB_STATUS,
  JOB_TYPE,
  WORK_LOCATION_TYPE,
} from "@/constants/enums";
import {
  AlignLeft,
  Briefcase,
  Building2,
  Clock,
  DollarSign,
  Layers,
  ListChecks,
  MapPin,
  Target,
  User,
  X,
} from "lucide-react";
import { useJob } from "../hooks/use-jobs";
import { formatJobLocation, formatPostedAt, formatSalary } from "../utils/job";

const DetailSection = ({ icon, title, children }) => {
  const Icon = icon;
  return (
    <section className="space-y-3">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-muted text-muted-foreground">
          <Icon className="h-3.5 w-3.5" />
        </span>
        {title}
      </h3>
      {children}
    </section>
  );
};

const DetailItem = ({ icon, label, value }) => {
  const Icon = icon;
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-muted/70 text-muted-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 wrap-break-word text-sm font-medium text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
};

const BulletList = ({ items }) => (
  <ul className="space-y-2.5">
    {items.map((item, i) => (
      <li
        key={i}
        className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
      >
        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
        {item}
      </li>
    ))}
  </ul>
);

const JobDetailsModal = ({ job, jobId, open, onOpenChange }) => {
  const { data, isLoading } = useJob(job ? null : jobId);
  const displayJob = job || data?.data;

  if (!open) return null;

  const jobType = getEnumByValue(JOB_TYPE, displayJob?.jobType);
  const locationType = getEnumByValue(
    WORK_LOCATION_TYPE,
    displayJob?.workLocationType,
  );
  const experienceLevel = getEnumByValue(
    EXPERIENCE_LEVEL,
    displayJob?.experienceLevel,
  );
  const status = getEnumByValue(JOB_STATUS, displayJob?.status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="max-w-3xl p-0">
      <div className="overflow-hidden rounded-lg">
        {isLoading ? (
          <div className="animate-pulse space-y-4 p-6">
            <div className="flex items-center gap-3">
              <Skeleton className="h-11 w-11 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        ) : !displayJob ? (
          <div className="flex flex-col items-center gap-3 p-10 text-center">
            <p className="text-muted-foreground">Job not found</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <ScrollArea className="max-h-[85dvh] w-full">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b bg-background px-5 py-4 sm:px-6 sm:py-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-base font-bold text-primary">
                  {displayJob.company?.charAt(0)?.toUpperCase() || "J"}
                </div>
                <div className="min-w-0">
                  <DialogTitle className="truncate text-lg sm:text-xl">
                    {displayJob.title}
                  </DialogTitle>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4 shrink-0" />
                    <span className="truncate">{displayJob.company}</span>
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 text-muted-foreground"
                onClick={() => onOpenChange(false)}
                aria-label="Close job details"
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
                  {jobType && (
                    <Badge variant="secondary" className={jobType.color}>
                      <Briefcase className="mr-1 h-3 w-3" />
                      {jobType.label}
                    </Badge>
                  )}
                  {locationType && (
                    <Badge variant="secondary" className={locationType.color}>
                      <MapPin className="mr-1 h-3 w-3" />
                      {locationType.label}
                    </Badge>
                  )}
                  {experienceLevel && (
                    <Badge
                      variant="secondary"
                      className={experienceLevel.color}
                    >
                      {experienceLevel.label}
                    </Badge>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  {displayJob.salary?.min != null && (
                    <DetailItem
                      icon={DollarSign}
                      label="Salary"
                      value={
                        <>
                          {formatSalary(displayJob.salary)}
                          {displayJob.salary?.isNegotiable && (
                            <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                              (Negotiable)
                            </span>
                          )}
                        </>
                      }
                    />
                  )}
                  {formatJobLocation(displayJob.location) && (
                    <DetailItem
                      icon={MapPin}
                      label="Location"
                      value={formatJobLocation(displayJob.location)}
                    />
                  )}
                  {displayJob.category && (
                    <DetailItem
                      icon={Layers}
                      label="Category"
                      value={displayJob.category}
                    />
                  )}
                  <DetailItem
                    icon={Clock}
                    label="Posted"
                    value={
                      <>
                        {formatPostedAt(displayJob.createdAt)}
                        {displayJob.postedBy?.name && (
                          <span className="ml-1.5 flex items-center gap-1 text-xs font-normal text-muted-foreground">
                            <User className="h-3 w-3" />
                            by {displayJob.postedBy.name}
                          </span>
                        )}
                      </>
                    }
                  />
                </div>

                <Separator />

                <DetailSection icon={AlignLeft} title="Description">
                  <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {displayJob.description}
                  </p>
                </DetailSection>

                {displayJob.requirements?.length > 0 && (
                  <DetailSection icon={ListChecks} title="Requirements">
                    <BulletList items={displayJob.requirements} />
                  </DetailSection>
                )}

                {displayJob.responsibilities?.length > 0 && (
                  <DetailSection icon={Target} title="Responsibilities">
                    <BulletList items={displayJob.responsibilities} />
                  </DetailSection>
                )}

                {displayJob.skills?.length > 0 && (
                  <DetailSection icon={Layers} title="Skills">
                    <div className="flex flex-wrap gap-2">
                      {displayJob.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </DetailSection>
                )}

                <p className="text-xs text-muted-foreground">
                  Job ID: {displayJob._id}
                </p>
              </div>
          </ScrollArea>
        )}
      </div>
    </Dialog>
  );
};

export default JobDetailsModal;
