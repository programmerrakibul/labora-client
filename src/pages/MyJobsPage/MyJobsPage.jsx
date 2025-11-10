import { useEffect, useState } from "react";
import MyContainer from "../../components/MyContainer/MyContainer";
import useAuthInfo from "../../hooks/useAuthInfo";
import useSecureAxios from "../../hooks/useSecureAxios";
import MyTitle from "../../components/MyTitle/MyTitle";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { VscEye } from "react-icons/vsc";
import { useNavigate } from "react-router";
import useMySwal from "../../hooks/useMySwal";
import MyButton from "../../components/MyButton/MyButton";
import { toast } from "react-toastify";

const MyJobsPage = () => {
  const [loading, setLoading] = useState(true);
  const [userJobs, setUserJobs] = useState([]);
  const { currentUser } = useAuthInfo();
  const secureAxios = useSecureAxios();
  const navigate = useNavigate();
  const mySwal = useMySwal();

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const { data } = await secureAxios.get("/jobs/user", {
          params: {
            email: currentUser.email,
          },
        });

        if (data.success) {
          setUserJobs(data.user_jobs);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [secureAxios, currentUser.email]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleDeleteClick = (id) => {
    mySwal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: false,
      showConfirmButton: false,
      html: (
        <>
          <p className="mb-5">You won't be able to revert this!</p>
          <div className="space-x-2.5">
            <MyButton onClick={() => handleDelete(id)}>
              Yes, Delete it!
            </MyButton>

            <MyButton onClick={() => mySwal.close()}>Cancel</MyButton>
          </div>
        </>
      ),
    });
  };

  const handleDelete = async (id) => {
    mySwal.showLoading();

    try {
      const { data } = await secureAxios.delete(`/jobs/${id}`);

      if (data.success) {
        const updatedJobs = userJobs.filter((item) => item._id !== id);
        setUserJobs(updatedJobs);

        mySwal.fire({
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch {
      toast.error("Job Data Delete Failed");
    } finally {
      mySwal.hideLoading();
    }
  };

  return (
    <>
      <title>My Added Jobs - Labora</title>

      <section className="my-6 py-8">
        <MyContainer className="space-y-7">
          <MyTitle>My Jobs</MyTitle>

          <div className="overflow-x-auto">
            <table className="table rounded-lg overflow-hidden  shadow-lg bg-linear-to-r from-primary/4 to-primary/4">
              <thead className="text-neutral bg-info/5 md:text-lg">
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Job Name</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody className="md:text-base">
                {userJobs.map((item, index) => (
                  <tr key={item._id}>
                    <td className="text-neutral">{index + 1}</td>
                    <td>
                      <img
                        src={item.job_image}
                        alt={item.job_title}
                        className="w-16 h-10 rounded-md object-cover overflow-hidden"
                      />
                    </td>
                    <td className="min-w-[200px]">{item.job_title}</td>
                    <td className="text-nowrap">{item.job_category}</td>
                    <td className="space-x-1.5 text-nowrap">
                      <button
                        onClick={() => navigate(`/job-details/${item._id}`)}
                        title="View"
                        className="btn shadow-none border-none bg-transparent p-1.5 text-xl md:text-2xl text-info"
                      >
                        <VscEye />
                      </button>

                      <button
                        title="Edit"
                        onClick={() =>
                          navigate(`/update-job-details/${item._id}`)
                        }
                        className="btn shadow-none border-none bg-transparent p-1.5 text-xl md:text-2xl text-success"
                      >
                        <FaRegEdit />
                      </button>

                      <button
                        onClick={() => handleDeleteClick(item._id)}
                        title="Delete"
                        className="btn shadow-none border-none bg-transparent p-1.5 text-xl md:text-2xl text-error"
                      >
                        <RiDeleteBinLine />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </MyContainer>
      </section>
    </>
  );
};

export default MyJobsPage;
