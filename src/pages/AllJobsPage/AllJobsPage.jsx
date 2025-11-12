import { useEffect, useState } from "react";
import MyTitle from "../../components/MyTitle/MyTitle";
import JobCard from "../../components/JobCard/JobCard";
import usePublicAxios from "../../hooks/usePublicAxios";
import MyContainer from "../../components/MyContainer/MyContainer";
import FetchSpinner from "../../components/FetchSpinner/FetchSpinner";

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
          <div className="space-y-4">
            <MyTitle>Explore All Jobs</MyTitle>
          </div>

          <div className="flex items-center justify-end">
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
          </div>

          {loading ? (
            <FetchSpinner />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7">
              {jobCardElements}
            </div>
          )}
        </MyContainer>
      </section>
    </>
  );
};

export default AllJobsPage;
