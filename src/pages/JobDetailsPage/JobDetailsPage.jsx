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

      <section className="py-6 my-8">
        <MyContainer className="space-y-3.5">
          <div className="flex flex-col-reverse md:flex-row justify-between gap-7">
            <div className="flex-2/3 space-y-3.5">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                {job_title}
              </h1>
              <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2.5">
                <p className="flex items-center gap-1.5">
                  <strong>Posted By:</strong> <span>{posted_by}</span>
                </p>

                <Badge>{job_category}</Badge>
              </div>

              <p className="space-x-1.5">
                <strong className="underline">Status:</strong>
                <span className="capitalize">{status}</span>
              </p>

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
            </div>

            <div className="flex-1/3 mx-auto">
              <div className="p-3 rounded-lg w-fit shadow-lg bg-base-300">
                <img
                  src={job_image}
                  alt={job_title}
                  className="rounded-lg aspect-3/2 object-cover"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <strong className="underline">Summery:</strong>
            <p className="text-justify">{job_summery}</p>
          </div>

          {currentUser.email !== creator_email && (
            <div className="card-actions">
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
        </MyContainer>
      </section>
    </>
  );
};

export default JobDetailsPage;
