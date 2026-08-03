import { useSearchParams } from "react-router";
import { useEffect, useRef } from "react";
import { useJobs } from "../hooks/use-jobs";
import useJobFilters, {
  setPage,
  resetFilters,
} from "@/stores/job-filters";
import JobCard from "../components/job-card";
import JobFilters from "../components/job-filters";
import Container from "@/components/shared/container";
import Pagination from "@/components/shared/pagination";
import NotFound from "@/components/shared/not-found";
import { CardSkeleton } from "@/components/shared/skeletons";
import { BriefcaseBusiness } from "lucide-react";

const filterKeys = [
  "search",
  "category",
  "jobType",
  "workLocationType",
  "experienceLevel",
  "minSalary",
  "maxSalary",
  "page",
  "limit",
];

const AllJobsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const hydrated = useRef(false);

  const { search, category, jobType, workLocationType, experienceLevel, page, limit } =
    useJobFilters();

  // Hydrate Zustand from URL on mount
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    const patch = {};
    for (const key of filterKeys) {
      const val = searchParams.get(key);
      if (val !== null) {
        patch[key] = key === "page" || key === "limit" ? Number(val) : val;
      }
    }
    if (Object.keys(patch).length > 0) {
      useJobFilters.setState(patch);
    }
  }, [searchParams]);

  // Sync Zustand → URL
  useEffect(() => {
    if (!hydrated.current) return;

    const next = new URLSearchParams();
    if (search) next.set("search", search);
    if (category) next.set("category", category);
    if (jobType) next.set("jobType", jobType);
    if (workLocationType) next.set("workLocationType", workLocationType);
    if (experienceLevel) next.set("experienceLevel", experienceLevel);
    if (page > 1) next.set("page", String(page));

    setSearchParams(next, { replace: true });
  }, [search, category, jobType, workLocationType, experienceLevel, page, setSearchParams]);

  const filters = {
    ...(search && { search }),
    ...(category && { category }),
    ...(jobType && { jobType }),
    ...(workLocationType && { workLocationType }),
    ...(experienceLevel && { experienceLevel }),
    page,
    limit,
  };

  const { data, isLoading } = useJobs(filters);

  const jobs = data?.data || [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages || 1;

  return (
    <Container className="py-8">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Browse Jobs</h1>
        <p className="text-muted-foreground">
          Find the perfect opportunity for your career
        </p>
      </div>

      <JobFilters />

      <div className="mt-6">
        {isLoading ? (
          <CardSkeleton count={6} />
        ) : jobs.length === 0 ? (
          <NotFound
            message="No jobs match your filters"
            icon={BriefcaseBusiness}
            action={resetFilters}
            actionLabel="Clear Filters"
          />
        ) : (
          <>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
            <div className="mt-8">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default AllJobsPage;
