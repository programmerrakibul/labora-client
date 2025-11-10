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
import useMySwal from "../../hooks/useMySwal";
import ActionSpinner from "../../components/ActionSpinner/ActionSpinner";

const JobDetailsPage = () => {
  const { id } = useParams();
  const mySwal = useMySwal();
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
      status: "pending",
    };

    try {
      const { data } = await secureAxios.put(`/jobs/${id}`, status);

      if (data.success) {
        setSingleJob({ ...singleJob, ...status });

        const { data } = await secureAxios.post("/added-tasks", newTask);

        if (data.success) {
          mySwal.fire({
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    } catch (err) {
      console.log(err);

      toast.error("Job Accepted failed");
    } finally {
      setAcceptLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <title>{`${job_title || "Job Details"} - Labora`}</title>

      <section>
        <MyContainer className="flex justify-between gap-7">
          <div className="flex-2/3">
            <h2>{job_title}</h2>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-1.5">
                <strong>Posted By:</strong> <span>{posted_by}</span>
              </p>

              <Badge>{job_category}</Badge>
            </div>

            <div className="space-y-3.5">
              <strong className="underline">Summery:</strong>
              <p>{job_summery}</p>

              <div className="flex items-center justify-between gap-1.5">
                <p className="flex items-center gap-1.5">
                  <span>
                    <SiMinutemailer />
                  </span>
                  <span>{creator_email}</span>
                </p>

                <p className="flex items-center gap-1.5">
                  <span>
                    <CiCalendarDate size={20} />
                  </span>
                  {created_at && (
                    <span>{format(new Date(created_at), "do MMMM, yyyy")}</span>
                  )}
                </p>
              </div>

              {currentUser.email !== creator_email && (
                <div className="card-actions justify-end">
                  <MyButton
                    disabled={acceptLoading || status === "accepted"}
                    onClick={handleAcceptJob}
                  >
                    {acceptLoading ? (
                      <ActionSpinner />
                    ) : status === "accepted" ? (
                      "Accepted"
                    ) : (
                      "Accept Job"
                    )}
                  </MyButton>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1/3 p-3 rounded-lg shadow-lg bg-base-300">
            <img
              src={job_image}
              alt={job_title}
              className="rounded-lg aspect-3/2 object-cover"
            />
          </div>
        </MyContainer>
      </section>
    </>
  );
};

export default JobDetailsPage;
