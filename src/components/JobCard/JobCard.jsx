import { MdOutlineVerifiedUser } from "react-icons/md";
import MyButton from "../MyButton/MyButton";
import { useNavigate } from "react-router";
import Badge from "../../Badge/Badge";

const JobCard = ({ singleJob }) => {
  const navigate = useNavigate();
  const { _id, job_title, job_image, job_category, job_summery, posted_by } =
    singleJob || {};

  return (
    <div className="flex items-center gap-5 bg-base-300 p-4 rounded-lg shadow-lg">
      <figure className="rounded-lg overflow-hidden">
        <img
          src={job_image}
          alt={job_title}
          className="aspect-3/2 object-cover w-full max-h-32"
        />
      </figure>

      <div className="flex-1 space-y-2.5">
        <div className="flex items-center justify-between gap-1.5">
          <p className="flex items-center gap-1.5 text-sm">
            <span>
              <MdOutlineVerifiedUser />
            </span>
            <span>{posted_by}</span>
          </p>
          <Badge>{job_category}</Badge>
        </div>

        <h4
          className="line-clamp-1 text-lg text-neutral font-semibold"
          title={job_title}
        >
          {job_title}
        </h4>
        <p className="line-clamp-2">{job_summery}</p>

        <div className="card-actions justify-end">
          <MyButton
            onClick={() => navigate(`/job-details/${_id}`)}
            className="btn-outline"
          >
            View Details
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
