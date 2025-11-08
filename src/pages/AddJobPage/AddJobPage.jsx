import MyContainer from "../../components/MyContainer/MyContainer";
import postImg from "../../assets/add_job_post.svg";
import MyLabel from "../../components/MyLabel/MyLabel";
import MyInput from "../../components/MyInput/MyInput";
import MyButton from "../../components/MyButton/MyButton";
import { toast } from "react-toastify";
import { useState } from "react";
import ActionSpinner from "../../components/ActionSpinner/ActionSpinner";

const AddJobPage = () => {
  const [loading, setLoading] = useState(false);

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

    console.log(formData);
    setLoading(false);
  };

  return (
    <>
      <title>Post a Job</title>

      <section className="py-8 my-5">
        <MyContainer className="flex flex-col md:flex-row items-center justify-between gap-7">
          <div className="flex-1/2">
            <img src={postImg} alt="Post a Job" />
          </div>

          <div className="flex-1/2 grid place-items-center">
            <form
              onSubmit={handlePostJob}
              className="bg-base-300 p-7 rounded-lg shadow-lg w-full space-y-5"
            >
              <div className="space-y-1.5">
                <MyLabel htmlFor="job_title">Title</MyLabel>
                <MyInput
                  disabled={loading}
                  name="job_title"
                  holder="Enter Job Title"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
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
        </MyContainer>
      </section>
    </>
  );
};

export default AddJobPage;
