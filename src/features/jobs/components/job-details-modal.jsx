import BulletList from "@/components/shared/bullet-list";
import DetailItem from "@/components/shared/detail-item";
import DetailSection from "@/components/shared/detail-section";
import Skeleton from "@/components/shared/skeleton";
import SkillChip from "@/components/shared/skill-chip";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  AlignLeft,
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
import JobBadges from "./job-badges";

const JobDetailsModal = ({ job, jobId, open, onOpenChange }) => {
  const { data, isLoading } = useJob(job ? null : jobId);
  const displayJob = job || data?.data;

  if (!open) return null;

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
                <JobBadges job={displayJob} showStatus />

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
                        <SkillChip
                          key={skill}
                          skill={skill}
                          size="md"
                          className="text-xs font-medium"
                        />
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
