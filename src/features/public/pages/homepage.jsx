import HomepageFeatures from "../components/homepage-features";
import HomepageHero from "../components/homepage-hero";
import HomepageStats from "../components/homepage-stats";
import LatestJobsSection from "../components/latest-jobs-section";

const Homepage = () => (
  <>
    <HomepageHero />
    <HomepageStats />
    <HomepageFeatures />
    <LatestJobsSection />
  </>
);

export default Homepage;
