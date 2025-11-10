import { useEffect, useState } from "react";
import MyContainer from "../../components/MyContainer/MyContainer";
import usePublicAxios from "../../hooks/usePublicAxios";
import MyTitle from "../../components/MyTitle/MyTitle";
import JobCard from "../../components/JobCard/JobCard";

const AllJobsPage = () => {
  const [loading, setLoading] = useState(true);
  const [allJobs, setAllJobs] = useState([]);
  const publicAxios = usePublicAxios();

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const { data } = await publicAxios.get("/jobs");

        setAllJobs(data.all_jobs);
      } finally {
        setLoading(false);
      }
    })();
  }, [publicAxios]);

  const jobCardElements = allJobs.map((item) => (
    <JobCard key={item._id} singleJob={item} />
  ));

  return (
    <>
      <title>Explore All Jobs - Labora</title>

      <section>
        <MyContainer>
          <MyTitle>Latest Jobs for You</MyTitle>

          <div></div>

          <div className="grid md:grid-cols-2 gap-7">
            {loading ? <p>Loading...</p> : jobCardElements}
          </div>
        </MyContainer>
      </section>
    </>
  );
};

export default AllJobsPage;
