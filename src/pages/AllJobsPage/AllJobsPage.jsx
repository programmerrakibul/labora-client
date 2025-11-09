import { useEffect, useState } from "react";
import MyContainer from "../../components/MyContainer/MyContainer";
import { toast } from "react-toastify";
import usePublicAxios from "../../hooks/usePublicAxios";
import MyTitle from "../../components/MyTitle/MyTitle";
import JobCard from "../../components/JobCard/JobCard";

const AllJobsPage = () => {
  const [loading, setLoading] = useState(true);
  const [allJobs, setAllJobs] = useState([]);
  const publicAxios = usePublicAxios();

  console.log(allJobs);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const { data } = await publicAxios.get("/jobs/latest");
        setAllJobs(data.latest_jobs);
      } catch (err) {
        toast.error(err.message);
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
      <title>All Jobs - Labora</title>

      <section>
        <MyContainer>
          <MyTitle>Latest Jobs for You</MyTitle>

          <div>
            
          </div>

          <div className="grid md:grid-cols-2 gap-7">
            {loading ? <p>Loading...</p> : jobCardElements}
          </div>
        </MyContainer>
      </section>
    </>
  );
};

export default AllJobsPage;
