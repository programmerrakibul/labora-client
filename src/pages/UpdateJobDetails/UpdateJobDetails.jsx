import { useEffect, useState } from "react";
import updateImg from "../../assets/job_update.svg";
import updateImgDark from "../../assets/job_update_dark.svg";
import MyLabel from "../../components/MyLabel/MyLabel";
import MyInput from "../../components/MyInput/MyInput";
import useSecureAxios from "../../hooks/useSecureAxios";
import MyButton from "../../components/MyButton/MyButton";
import ActionSpinner from "../../components/ActionSpinner/ActionSpinner";
import MyContainer from "../../components/MyContainer/MyContainer";
import { useParams } from "react-router";
import useMySwal from "../../hooks/useMySwal";
import { toast } from "react-toastify";
import MyTitle from "../../components/MyTitle/MyTitle";
import useThemeContext from "../../hooks/useThemeContext";
import FetchSpinner from "../../components/FetchSpinner/FetchSpinner";

const UpdateJobDetails = () => {
  const { id } = useParams();
  const mySwal = useMySwal();
  const { theme } = useThemeContext();
  const secureAxios = useSecureAxios();
  const [productLoading, setProductLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [singleJob, setSingleJob] = useState({});
  const { job_title, job_image, job_category, job_summery } = singleJob;

  useEffect(() => {
    (async () => {
      setProductLoading(true);

      try {
        const { data } = await secureAxios.get(`/jobs/${id}`);

        if (data.success) {
          setSingleJob(data.single_job);
        }
      } finally {
        setProductLoading(false);
      }
    })();
  }, [secureAxios, id]);

  const handleUpdateJob = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    Object.entries(formData).forEach(([key, value]) => {
      formData[key] = value.trim();
    });

    try {
      const { data } = await secureAxios.put(`/jobs/${id}`, formData);

      if (data.success) {
        mySwal.fire({
          icon: "success",
          title: data.message,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch {
      toast.error("Job data update failed");
    } finally {
      setLoading(false);
    }
  };

  const image = theme === "light" ? updateImg : updateImgDark;

  if (productLoading) {
    return <FetchSpinner />;
  }

  return (
    <>
      <title>Update your job details - Labora</title>

      <section className="py-8 my-5">
        <MyContainer>
          <div className="space-y-10 max-w-4xl mx-auto">
            <div>
              <MyTitle>Update Your Job</MyTitle>
            </div>

            <div className="p-4 md:p-8 rounded-md shadow-md bg-primary/7 dark:bg-info/30 lg:flex lg:items-center lg:justify-between lg:gap-8 max-w-md lg:max-w-full mx-auto">
              <div className="lg:flex-1/2">
                <form onSubmit={handleUpdateJob} className="space-y-3.5">
                  <div className="space-y-1.5">
                    <MyLabel htmlFor="job_title">Title</MyLabel>
                    <MyInput
                      disabled={loading}
                      name="job_title"
                      holder="Enter Job Title"
                      defaultValue={job_title}
                      required={false}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1/2">
                      <MyLabel htmlFor="job_category">Category</MyLabel>

                      <select
                        defaultValue={job_category}
                        className="select"
                        name="job_category"
                        id="job_category"
                        disabled={loading}
                      >
                        <option disabled={true}>Enter Job Category</option>
                        <option>AI & Machine Learning</option>
                        <option>Graphics Design</option>
                        <option>Scriptwriting</option>
                        <option>Video Editing</option>
                        <option>UI/UX Design</option>
                        <option>Game Design</option>
                        <option>3D Modeling</option>
                        <option>Web Design</option>
                        <option>Data Entry</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 flex-1/2">
                      <MyLabel htmlFor="job_image">Job Image</MyLabel>
                      <MyInput
                        disabled={loading}
                        name="job_image"
                        holder="Enter Job Photo URL"
                        required={false}
                        defaultValue={job_image}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <MyLabel htmlFor="job_summery">Summery</MyLabel>
                    <textarea
                      name="job_summery"
                      id="job_summery"
                      className="textarea"
                      placeholder="Enter Job Summery"
                      defaultValue={job_summery}
                      disabled={loading}
                    ></textarea>
                  </div>

                  <div>
                    <MyButton disabled={loading} className="btn-block">
                      {loading ? <ActionSpinner /> : "Update"}
                    </MyButton>
                  </div>
                </form>
              </div>

              <div className="flex-1/2 hidden lg:inline-block">
                <img src={image} alt="Post a Job" />
              </div>
            </div>
          </div>
        </MyContainer>
      </section>
    </>
  );
};

export default UpdateJobDetails;
