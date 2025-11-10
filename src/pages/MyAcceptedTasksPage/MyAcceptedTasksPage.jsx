import { useEffect, useState } from "react";
import MyContainer from "../../components/MyContainer/MyContainer";
import MyTitle from "../../components/MyTitle/MyTitle";
import useSecureAxios from "../../hooks/useSecureAxios";
import useAuthInfo from "../../hooks/useAuthInfo";
import { useNavigate } from "react-router";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import { VscEye } from "react-icons/vsc";
import { toast } from "react-toastify";
import useMySwal from "../../hooks/useMySwal";

const MyAcceptedTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [taskLoading, setTaskLoading] = useState(true);
  const secureAxios = useSecureAxios();
  const { currentUser } = useAuthInfo();
  const navigate = useNavigate();
  const mySwal = useMySwal();

  useEffect(() => {
    (async () => {
      setTaskLoading(true);

      try {
        const { data } = await secureAxios.get("/added-tasks/user", {
          params: {
            email: currentUser.email,
          },
        });

        if (data.success) {
          setTasks(data.user_tasks);
        }
      } finally {
        setTaskLoading(false);
      }
    })();
  }, [secureAxios, currentUser.email]);

  const handleDoneAndCancel = async (value, taskId, jobId) => {
    setLoading(true);

    try {
      const { data } = await secureAxios.delete(`/added-tasks/${taskId}`);

      if (data.success) {
        const updated = tasks.filter((item) => item._id !== taskId);
        setTasks(updated);

        const { data } = await secureAxios.delete(`/jobs/${jobId}`);

        if (data.success) {
          mySwal.fire({
            icon: "success",
            title:
              value === "done"
                ? "Task completed successfully"
                : value === "terminate" && "Task terminated",
          });
        }
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (taskLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <title>My Accepted Tasks - Labora</title>

      <section>
        <MyContainer>
          <MyTitle>My Accepted Tasks</MyTitle>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Job Name</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {tasks.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item.job_details.job_image}
                        alt={item.job_details.job_title}
                        className="w-16 h-10 rounded-md overflow-hidden"
                      />
                    </td>
                    <td>{item.job_details.job_title}</td>
                    <td>{item.job_details.job_category}</td>
                    <td className="space-x-1.5 text-nowrap">
                      <button
                        onClick={() =>
                          navigate(`/job-details/${item.job_details._id}`)
                        }
                        title="View"
                        className="btn shadow-none border-none bg-transparent p-1.5 text-2xl text-info"
                      >
                        <VscEye />
                      </button>

                      <button
                        title="Done"
                        disabled={loading}
                        onClick={() =>
                          handleDoneAndCancel(
                            "done",
                            item._id,
                            item.job_details._id
                          )
                        }
                        className="btn shadow-none border-none bg-transparent p-1.5 text-xl text-success"
                      >
                        <FaRegCheckCircle />
                      </button>

                      <button
                        title="Terminate"
                        disabled={loading}
                        onClick={() =>
                          handleDoneAndCancel(
                            "terminate",
                            item._id,
                            item.job_details._id
                          )
                        }
                        className="btn shadow-none border-none bg-transparent p-1.5 text-xl text-error"
                      >
                        <FaRegCircleXmark />
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

export default MyAcceptedTasksPage;
