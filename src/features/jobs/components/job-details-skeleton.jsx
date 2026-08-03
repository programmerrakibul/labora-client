import Container from "@/components/shared/container";
import Skeleton from "@/components/shared/skeleton";

const JobDetailsSkeleton = () => (
  <Container className="py-8">
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-48 w-full" />
    </div>
  </Container>
);

export default JobDetailsSkeleton;
