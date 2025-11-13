import { format } from "date-fns";
import Badge from "../../components/Badge/Badge";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import useSecureAxios from "../../hooks/useSecureAxios";
import MyContainer from "../../components/MyContainer/MyContainer";
import { SiMinutemailer } from "react-icons/si";
import MyButton from "../../components/MyButton/MyButton";
import useAuthInfo from "../../hooks/useAuthInfo";
import ActionSpinner from "../../components/ActionSpinner/ActionSpinner";
import FetchSpinner from "../../components/FetchSpinner/FetchSpinner";
// eslint-disable-next-line no-unused-vars
import * as motion from "motion/react-client";
import { getAlert } from "../../utilities/getAlert";

const JobDetailsPage = () => {
  const { id } = useParams();
  const secureAxios = useSecureAxios();
  const [loading, setLoading] = useState(true);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [singleJob, setSingleJob] = useState({});
  const { currentUser } = useAuthInfo();
  const {
    job_title,
    job_image,
    job_category,
    job_summery,
    posted_by,
    created_at,
    creator_email,
    status,
  } = singleJob;

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const { data } = await secureAxios.get(`/jobs/${id}`);

        if (data.success) {
          setSingleJob(data.single_job);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [secureAxios, id]);

  const handleAcceptJob = async () => {
    setAcceptLoading(true);

    const status = {
      status: "accepted",
    };

    const newTask = {
      job_id: id,
      accepted_user_name: currentUser.displayName,
      accepted_user_email: currentUser.email,
      accepted_at: new Date().toISOString(),
    };

    try {
      const { data } = await secureAxios.put(`/jobs/${id}`, status);

      if (data.success) {
        setSingleJob({ ...singleJob, ...status });

        const { data } = await secureAxios.post("/added-tasks", newTask);

        if (data.success) {
          getAlert({
            title: "Job accepted successfully",
          });
        }
      }
    } catch {
      toast.error("Job Accepted failed");
    } finally {
      setAcceptLoading(false);
    }
  };

  if (loading) {
    return <FetchSpinner />;
  }

  return (
    <>
      <title>{`${job_title || "Job Details"} - Labora`}</title>

      <section className="py-6 my-8">
        <MyContainer className="space-y-3.5">
          <div className="flex flex-col-reverse md:flex-row justify-between gap-7">
            <motion.div
              className="flex-2/3 space-y-3.5"
              initial={{ opacity: 0, y: "-100vh" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", delay: 0.3, bounce: 0.4 }}
            >
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                {job_title}
              </h1>
              <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2.5">
                <p className="flex items-center gap-1.5">
                  <strong>Posted By:</strong> <span>{posted_by}</span>
                </p>

                <Badge>{job_category}</Badge>
              </div>

              {status === "completed" && (
                <p className="space-x-1.5">
                  <strong className="underline">Status:</strong>
                  <span className="capitalize">{status}</span>
                </p>
              )}

              <div className="flex items-center flex-wrap justify-between gap-1.5">
                <div className="space-y-1.5">
                  <strong className="underline">Contact:</strong>
                  <p className="flex items-center gap-1.5">
                    <span>
                      <SiMinutemailer />
                    </span>
                    <span>{creator_email}</span>
                  </p>
                </div>

                <p className="flex items-center gap-1.5">
                  <span>
                    <CiCalendarDate size={20} />
                  </span>

                  {created_at && (
                    <span>{format(new Date(created_at), "do MMMM, yyyy")}</span>
                  )}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex-1/3 mx-auto"
              initial={{ opacity: 0, x: "100vw" }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", delay: 0.3, bounce: 0.4 }}
            >
              <div className="p-3 rounded-lg h-fit shadow-lg bg-base-300">
                <img
                  src={job_image}
                  alt={job_title}
                  className="rounded-lg aspect-3/2 w-full object-cover"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            className="space-y-1.5"
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", delay: 0.3, bounce: 0.4 }}
          >
            <strong className="underline">Summery:</strong>
            <p className="text-justify max-w-4xl w-full">{job_summery}</p>
          </motion.div>

          {currentUser.email !== creator_email && (
            <motion.div
              className="card-actions"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", delay: 0.3, bounce: 0.4 }}
            >
              <MyButton
                disabled={acceptLoading || status === "completed"}
                onClick={handleAcceptJob}
              >
                {acceptLoading ? (
                  <ActionSpinner />
                ) : status === "completed" ? (
                  "Completed"
                ) : (
                  "Accept Job"
                )}
              </MyButton>
            </motion.div>
          )}
        </MyContainer>
      </section>
    </>
  );
};

export default JobDetailsPage;
