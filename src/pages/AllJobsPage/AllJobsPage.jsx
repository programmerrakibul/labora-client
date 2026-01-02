import { useEffect, useState } from "react";
import MyTitle from "../../components/ui/MyTitle/MyTitle";
import JobCard from "../../components/shared/JobCard/JobCard";
import usePublicAxios from "../../hooks/usePublicAxios";
import MyContainer from "../../components/shared/MyContainer/MyContainer";
import FetchSpinner from "../../components/ui/FetchSpinner/FetchSpinner";
// eslint-disable-next-line no-unused-vars
import * as motion from "motion/react-client";

const AllJobsPage = () => {
  const [loading, setLoading] = useState(true);
  const [allJobs, setAllJobs] = useState([]);
  const [dateSortOrder, setDateSortOrder] = useState("");
  const publicAxios = usePublicAxios();

  useEffect(() => {
    (async () => {
      setLoading(true);

      const sort = {};

      if (dateSortOrder) {
        sort["sortBy"] = "created_at";
        sort["sortOrder"] = dateSortOrder;
      }

      try {
        const { data } = await publicAxios.get("/jobs", {
          params: {
            excludes: "creator_email,created_at,status",
            ...sort,
          },
        });

        if (data.success) {
          setAllJobs(data.jobs);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [publicAxios, dateSortOrder]);

  const jobCardElements = allJobs.map((item) => (
    <JobCard key={item._id} singleJob={item} />
  ));

  return (
    <>
      <title>Explore All Jobs - Labora</title>

      <section className="py-8 my-6">
        <MyContainer className="space-y-10">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: "-100vh" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", delay: 0.3, bounce: 0.4 }}
          >
            <MyTitle>Explore All Jobs</MyTitle>
          </motion.div>

          <motion.div
            className="flex items-center justify-end"
            initial={{ opacity: 0, x: "100vw" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", delay: 0.3, bounce: 0.4 }}
          >
            <div>
              <select
                onChange={(e) => setDateSortOrder(e.currentTarget.value)}
                defaultValue="Sort by Date"
                className="select min-w-[150px]"
              >
                <option disabled={true}>Sort by Date</option>
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </motion.div>

          {loading ? (
            <FetchSpinner />
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-7">
              {jobCardElements}
            </div>
          )}
        </MyContainer>
      </section>
    </>
  );
};

export default AllJobsPage;
