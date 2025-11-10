import { MdOutlineVerifiedUser } from "react-icons/md";
import MyButton from "../MyButton/MyButton";
import { useNavigate } from "react-router";
import Badge from "../Badge/Badge";

const JobCard = ({ singleJob }) => {
  const navigate = useNavigate();
  const { _id, job_title, job_image, job_category, job_summery, posted_by } =
    singleJob || {};

  return (
    <div className="bg-base-300 dark:border-2 border-white/20 rounded-lg shadow-lg dark:shadow-white/30 dark:shadow-md overflow-hidden">
      <figure className="relative">
        <img
          src={job_image}
          alt={job_title}
          className="aspect-3/2 object-cover w-full max-h-52"
        />
        <Badge className="absolute bottom-5 right-5">{job_category}</Badge>
      </figure>

      <div className="space-y-2 p-4">
        <div className="flex items-center gap-1.5 text-sm text-primary/60 dark:text-primary">
          <span>
            <MdOutlineVerifiedUser />
          </span>
          <span>{posted_by}</span>
        </div>

        <h4
          className="line-clamp-1 text-lg text-neutral font-semibold"
          title={job_title}
        >
          {job_title}
        </h4>
        <p className="line-clamp-2">{job_summery}</p>

        <div className="card-actions justify-end">
          <MyButton onClick={() => navigate(`/job-details/${_id}`)}>
            View Details
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
