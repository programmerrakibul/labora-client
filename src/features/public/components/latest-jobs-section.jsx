import Container from "@/components/shared/container";
import NotFound from "@/components/shared/not-found";
import Skeleton from "@/components/shared/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import JobCard from "@/features/jobs/components/job-card";
import { useJobs } from "@/features/jobs/hooks/use-jobs";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { useNavigate } from "react-router";

const JobCardSkeleton = () => (
  <Card>
    <CardContent className="space-y-3 p-4 pt-4">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </CardContent>
  </Card>
);

const LatestJobsSection = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useJobs({ limit: 6, status: "ACTIVE" });
  const jobs = data?.data || [];

  return (
    <section className="bg-muted/50 py-16">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Latest Jobs</h2>
            <p className="mt-1 text-muted-foreground">
              Explore the newest opportunities
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate("/all-jobs")}>
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        {!isLoading && jobs.length === 0 ? (
          <NotFound
            message="No jobs available right now"
            icon={BriefcaseBusiness}
          />
        ) : (
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[Autoplay({ delay: 4000, stopOnInteraction: false })]}
          >
            <CarouselContent>
              {isLoading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <CarouselItem
                      key={i}
                      className="basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                      <JobCardSkeleton />
                    </CarouselItem>
                  ))
                : jobs.map((job) => (
                    <CarouselItem
                      key={job._id}
                      className="basis-full sm:basis-1/2 lg:basis-1/3 h-full"
                    >
                      <JobCard job={job} />
                    </CarouselItem>
                  ))}
            </CarouselContent>
          </Carousel>
        )}
      </Container>
    </section>
  );
};

export default LatestJobsSection;
