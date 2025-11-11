import { useEffect, useState } from "react";
import JobCard from "../../components/JobCard/JobCard";
import MyTitle from "../../components/MyTitle/MyTitle";
import usePublicAxios from "../../hooks/usePublicAxios";
import MyContainer from "../../components/MyContainer/MyContainer";
import { FaCode, FaPalette, FaStar } from "react-icons/fa";
import useCategoryData from "../../hooks/useCategoryData";
import useFeaturesData from "../../hooks/useFeaturesData";
import BannerSlider from "../../components/BannerSlider/BannerSlider";
import Badge from "../../components/Badge/Badge";
import FetchSpinner from "../../components/FetchSpinner/FetchSpinner";

const Homepage = () => {
  const publicAxios = usePublicAxios();
  const [loading, setLoading] = useState(true);
  const [latestJobs, setLatestJobs] = useState([]);
  const categories = useCategoryData();
  const featuresData = useFeaturesData();

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

      <section className="mt-10">
        <MyContainer>
          <BannerSlider />
        </MyContainer>
      </section>

      <section className="bg-secondary/3 py-10">
        <MyContainer className="space-y-7">
          <div className="text-center space-y-3.5">
            <MyTitle>
              <span className="primary_linear bg-clip-text text-transparent">
                Latest Jobs
              </span>{" "}
              for You
            </MyTitle>

            <p className="text-base md:text-lg max-w-xl mx-auto">
              Discover fresh opportunities tailored to your skills and
              interests. Stay ahead with curated job listings that match your
              goals and career aspirations
            </p>
          </div>

          {loading ? (
            <FetchSpinner className="min-h-[30dvh]" />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7">
              {jobCardElements}
            </div>
          )}
        </MyContainer>
      </section>

      <section>
        <MyContainer className="space-y-14">
          <div className="text-center space-y-3.5">
            <MyTitle>
              <span className="primary_linear bg-clip-text text-transparent">
                Popular
              </span>{" "}
              Categories
            </MyTitle>
            <p className="text-base md:text-lg max-w-xl mx-auto">
              Discover thousands of opportunities across our most popular
              freelance categories
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group dark:border-2 border-white/20 dark:shadow-white/15"
              >
                <figure className="relative h-40 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

                  <div className="absolute bottom-4 left-4">
                    <Badge className={`${category.color} badge-lg`}>
                      {category.icon}
                    </Badge>
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <Badge>{category.jobs} jobs</Badge>
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
            <div className="flex flex-wrap justify-center items-center shadow-lg bg-base-200 mx-auto max-w-4xl w-full rounded-lg">
              <div className="stat border-none w-fit">
                <div className="stat-title text-xl">Happy Clients</div>
                <div className="stat-value text-5xl text-primary">10K+</div>
              </div>

              <div className="stat border-none w-fit">
                <div className="stat-title text-xl">Projects Done</div>
                <div className="stat-value text-5xl text-secondary">25K+</div>
              </div>

              <div className="stat border-none w-fit">
                <div className="stat-title text-xl">Freelancers</div>
                <div className="stat-value text-5xl text-accent">5K+</div>
              </div>
            </div>
          </div>
        </MyContainer>
      </section>

      <section className="mt-6 py-8 bg-info/4 dark:bg-info/20">
        <MyContainer className="space-y-9">
          <div className="text-center space-y-3.5">
            <MyTitle>
              Where{" "}
              <span className="primary_linear bg-clip-text text-transparent">
                Talent
              </span>{" "}
              Meets{" "}
              <span className="primary_linear bg-clip-text text-transparent">
                Opportunity
              </span>
            </MyTitle>
            <p className="text-base md:text-lg max-w-xl mx-auto">
              Labora is where world-class talent meets opportunity. We're
              building the future of work by connecting exceptional freelancers
              with businesses that need their skills. Whether you're looking to
              hire or get hired, Labora makes it simple, secure, and successful.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl text-neutral font-bold">
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
                  className="card bg-base-200 shadow-sm dark:shadow-white/30 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="card-body">
                    <div className="text-primary mb-3">{feature.icon}</div>
                    <h4 className="card-title text-lg font-semibold">
                      {feature.title}
                    </h4>
                    <p>{feature.description}</p>
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
