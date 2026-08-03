import BlogInsightsSection from "../components/blog-insights-section";
import CategoryExplorerSection from "../components/category-explorer-section";
import CtaBannerSection from "../components/cta-banner-section";
import HomepageHero from "../components/homepage-hero";
import LatestJobsSection from "../components/latest-jobs-section";
import StatsSection from "../components/stats-section";
import TalentSpotlightSection from "../components/talent-spotlight-section";
import TestimonialsSection from "../components/testimonials-section";
import TopCompaniesSection from "../components/top-companies-section";
import WorkflowSection from "../components/workflow-section";

const Homepage = () => (
  <>
    <HomepageHero />
    <StatsSection />
    <CategoryExplorerSection />
    <LatestJobsSection />
    <WorkflowSection />
    <TopCompaniesSection />
    <TalentSpotlightSection />
    <TestimonialsSection />
    <BlogInsightsSection />
    <CtaBannerSection />
  </>
);

export default Homepage;
