import { useEffect, useState } from "react";
import MyContainer from "../../components/MyContainer/MyContainer";
import useAuthInfo from "../../hooks/useAuthInfo";
import useSecureAxios from "../../hooks/useSecureAxios";
import MyTitle from "../../components/MyTitle/MyTitle";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { VscEye } from "react-icons/vsc";
import { useNavigate } from "react-router";

const MyJobsPage = () => {
  const [loading, setLoading] = useState(true);
  const [userJobs, setUserJobs] = useState([]);
  const { currentUser } = useAuthInfo();
  const secureAxios = useSecureAxios();
  const navigate = useNavigate();

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

  return (
    <>
      <title>My Jobs</title>

      <section>
        <MyContainer>
          <MyTitle>My Jobs</MyTitle>

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
                {userJobs.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item.job_image}
                        alt={item.job_title}
                        className="w-16 rounded-md"
                      />
                    </td>
                    <td>{item.job_title}</td>
                    <td>{item.job_category}</td>
                    <td className="space-x-1.5 text-nowrap">
                      <button
                        onClick={() => navigate(`/job-details/${item._id}`)}
                        title="View"
                        className="btn shadow-none border-none bg-transparent p-1.5 text-2xl text-info"
                      >
                        <VscEye />
                      </button>

                      <button
                        title="Edit"
                        onClick={() =>
                          navigate(`/update-job-details/${item._id}`)
                        }
                        className="btn shadow-none border-none bg-transparent p-1.5 text-2xl text-success"
                      >
                        <FaRegEdit />
                      </button>

                      <button
                        title="Delete"
                        className="btn shadow-none border-none bg-transparent p-1.5 text-2xl text-error"
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
