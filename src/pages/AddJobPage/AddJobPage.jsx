import { useState } from "react";
import { toast } from "react-toastify";
import useMySwal from "../../hooks/useMySwal";
import useAuthInfo from "../../hooks/useAuthInfo";
import postImg from "../../assets/add_job_post.svg";
import MyInput from "../../components/MyInput/MyInput";
import MyLabel from "../../components/MyLabel/MyLabel";
import MyTitle from "../../components/MyTitle/MyTitle";
import useSecureAxios from "../../hooks/useSecureAxios";
import useThemeContext from "../../hooks/useThemeContext";
import MyButton from "../../components/MyButton/MyButton";
import postImgDark from "../../assets/add_job_post_dark.svg";
import MyContainer from "../../components/MyContainer/MyContainer";
import ActionSpinner from "../../components/ActionSpinner/ActionSpinner";

const AddJobPage = () => {
  const mySwal = useMySwal();
  const secureAxios = useSecureAxios();
  const { currentUser } = useAuthInfo();
  const [loading, setLoading] = useState(false);
  const { theme } = useThemeContext();

  const handlePostJob = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    Object.entries(formData).forEach(([key, value]) => {
      formData[key] = value.trim();
    });

    const isEmpty = Object.values(formData).some((value) => !value);

    if (isEmpty) {
      toast.warn("Enter valid job data to proceed");
      setLoading(false);
      return;
    }

    formData["posted_by"] = currentUser.displayName;
    formData["creator_email"] = currentUser.email;
    formData["created_at"] = new Date().toISOString();
    formData["status"] = "pending";

    try {
      const { data } = await secureAxios.post("/jobs", formData);

      form.reset();
      mySwal.fire({
        icon: "success",
        title: data.message,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const image = theme === "light" ? postImg : postImgDark;

  return (
    <>
      <title>Post a Job - Labora</title>

      <section className="py-8 my-5">
        <MyContainer>
          <div className="space-y-10 max-w-4xl mx-auto">
            <div>
              <MyTitle>Add Your Job</MyTitle>
            </div>
            <div className="p-4 md:p-8 rounded-md shadow-md bg-primary/7 dark:bg-info/30 lg:flex lg:items-center lg:justify-between lg:gap-8 max-w-md lg:max-w-full mx-auto">
              <div className="flex-1/2 hidden lg:inline-block">
                <img src={image} alt="Post a Job" />
              </div>

              <div className="lg:flex-1/2">
                <form onSubmit={handlePostJob} className="space-y-3.5">
                  <div className="space-y-1.5">
                    <MyLabel htmlFor="job_title">Title</MyLabel>
                    <MyInput
                      disabled={loading}
                      name="job_title"
                      holder="Enter Job Title"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1/2">
                      <MyLabel htmlFor="job_category">Category</MyLabel>

                      <select
                        defaultValue=""
                        className="select"
                        name="job_category"
                        id="job_category"
                        disabled={loading}
                        required
                      >
                        <option value="" disabled={true}>
                          Enter Job Category
                        </option>
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
                      required
                      disabled={loading}
                    ></textarea>
                  </div>

                  <div>
                    <MyButton disabled={loading} className="btn-block">
                      {loading ? <ActionSpinner /> : "Add A Job"}
                    </MyButton>
                  </div>
                </form>
              </div>
            </div>{" "}
          </div>
        </MyContainer>
      </section>
    </>
  );
};

export default AddJobPage;
