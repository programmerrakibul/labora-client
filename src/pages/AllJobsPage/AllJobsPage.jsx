import { useEffect, useState } from "react";
import MyTitle from "../../components/MyTitle/MyTitle";
import JobCard from "../../components/JobCard/JobCard";
import usePublicAxios from "../../hooks/usePublicAxios";
import MyContainer from "../../components/MyContainer/MyContainer";
import FetchSpinner from "../../components/FetchSpinner/FetchSpinner";

const AllJobsPage = () => {
  const [loading, setLoading] = useState(true);
  const [allJobs, setAllJobs] = useState([]);
  const publicAxios = usePublicAxios();

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const { data } = await publicAxios.get("/jobs", {
          params: {
            excludes: "creator_email,created_at,status",
          },
        });

        if (data.success) {
          setAllJobs(data.jobs);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [publicAxios]);

  const jobCardElements = allJobs.map((item) => (
    <JobCard key={item._id} singleJob={item} />
  ));

  if (loading) {
    return <FetchSpinner className="min-h-[40dvh]" />;
  }

  return (
    <>
      <title>Explore All Jobs - Labora</title>

      <section className="py-8 my-6">
        <MyContainer className="space-y-10">
          <div className="space-y-4">
            <MyTitle>Explore All Jobs</MyTitle>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7">
            {jobCardElements}
          </div>
        </MyContainer>
      </section>
    </>
  );
};

export default AllJobsPage;
