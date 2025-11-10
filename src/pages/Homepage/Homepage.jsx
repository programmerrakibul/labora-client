import { useEffect, useState } from "react";
import JobCard from "../../components/JobCard/JobCard";
import MyTitle from "../../components/MyTitle/MyTitle";
import usePublicAxios from "../../hooks/usePublicAxios";
import MyContainer from "../../components/MyContainer/MyContainer";
import { FaCode, FaPalette, FaStar } from "react-icons/fa";
import useCategoryData from "../../hooks/useCategoryData";
import useFeaturesData from "../../hooks/useFeaturesData";
import MyButton from "../../components/MyButton/MyButton";
import { useNavigate } from "react-router";

const Homepage = () => {
  const publicAxios = usePublicAxios();
  const [loading, setLoading] = useState(true);
  const [latestJobs, setLatestJobs] = useState([]);
  const categories = useCategoryData();
  const featuresData = useFeaturesData();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const { data } = await publicAxios.get("/jobs/latest");
        setLatestJobs(data.latest_jobs);
      } finally {
        setLoading(false);
      }
    })();
  }, [publicAxios]);

  const jobCardElements = latestJobs.map((item) => (
    <JobCard key={item._id} singleJob={item} />
  ));

  return (
    <>
      <title>Home - Labora</title>

      <section className="bg-primary/20 min-h-[70dvh] grid place-items-center py-7">
        <MyContainer className="text-center">
          <div className="max-w-5xl mx-auto space-y-4">
            <h1 className="text-neutral text-5xl md:text-6xl lg:text-7xl font-bold">
              Find Your Perfect Freelance Job
            </h1>
            <p className="max-w-3xl mx-auto">
              Discover a world of flexible opportunities tailored to your skills
              and lifestyle. Whether you're a seasoned freelancer or just
              starting out, our platform connects you with projects that match
              your passion, schedule, and goals.
            </p>
            <div className="space-x-3.5">
              <MyButton onClick={() => navigate("/all-jobs")}>
                Explore Jobs
              </MyButton>
              
              <MyButton onClick={() => navigate("/add-job")}>Add Job</MyButton>
            </div>
          </div>
        </MyContainer>
      </section>

      <section>
        <MyContainer className="space-y-7">
          <MyTitle>Latest Jobs for You</MyTitle>

          <div className="grid md:grid-cols-2 gap-7">
            {loading ? <p>Loading...</p> : jobCardElements}
          </div>
        </MyContainer>
      </section>

      <section className="py-6">
        <MyContainer>
          <div className="text-center mb-12">
            <MyTitle>Popular Categories</MyTitle>
            <p className="text-lg max-w-2xl mx-auto">
              Discover thousands of opportunities across our most popular
              freelance categories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <figure className="relative h-40 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span
                      className={`badge badge-lg text-white border-none ${category.color}`}
                    >
                      {category.icon}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="badge badge-lg badge-primary text-white">
                      {category.jobs} jobs
                    </span>
                  </div>
                </figure>

                <div className="card-body">
                  <h3 className="card-title text-lg font-bold text-neutral">
                    {category.name}
                  </h3>
                  <p>{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </MyContainer>
      </section>

      <section>
        <MyContainer>
          <div className="text-center">
            <div className="stats shadow-lg bg-white max-w-4xl w-full">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <FaStar className="text-4xl" />
                </div>
                <div className="stat-title text-xl">Happy Clients</div>
                <div className="stat-value text-5xl text-primary">10K+</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-secondary">
                  <FaCode className="text-4xl" />
                </div>
                <div className="stat-title text-xl">Projects Done</div>
                <div className="stat-value text-5xl text-secondary">25K+</div>
              </div>

              <div className="stat">
                <div className="stat-figure text-accent">
                  <FaPalette className="text-4xl" />
                </div>
                <div className="stat-title text-xl">Freelancers</div>
                <div className="stat-value text-5xl text-accent">5K+</div>
              </div>
            </div>
          </div>
        </MyContainer>
      </section>

      <section>
        <MyContainer className="space-y-9">
          <div className="text-center space-y-3.5">
            <MyTitle>Where Talent Meets Opportunity</MyTitle>
            <p className="text-lg max-w-3xl mx-auto">
              Labora is where world-class talent meets opportunity. We're
              building the future of work by connecting exceptional freelancers
              with businesses that need their skills. Whether you're looking to
              hire or get hired, Labora makes it simple, secure, and successful.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-4">
              <h3 className="text-2xl text-neutral font-bold">
                Revolutionizing How The World Works
              </h3>
              <div className="space-y-2.5">
                <p>
                  Founded on the principle that great work knows no boundaries,
                  Labora breaks down geographical barriers to bring you the best
                  talent from every corner of the globe.
                </p>
                <p>
                  Our intelligent matching system ensures you find the perfect
                  freelancer for your project needs, while our secure platform
                  protects both clients and talent throughout the entire
                  process.
                </p>
                <p>
                  From startups to Fortune 500 companies, thousands of
                  businesses trust Labora to scale their teams and bring their
                  ideas to life.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {featuresData.map((feature) => (
                <div
                  key={feature.id}
                  className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="card-body">
                    <div className="text-primary mb-3">{feature.icon}</div>
                    <h4 className="card-title text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MyContainer>
      </section>
    </>
  );
};

export default Homepage;
