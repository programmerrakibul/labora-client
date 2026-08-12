import Seo from "@/components/shared/seo";
import AboutHero from "../components/about-hero";
import CtaBannerSection from "../components/cta-banner-section";
import PlatformWorkflowSection from "../components/platform-workflow-section";
import StatsSection from "../components/stats-section";
import StorySection from "../components/story-section";
import TalentPipelineSection from "../components/talent-pipeline-section";
import TeamSection from "../components/team-section";
import WhyChooseSection from "../components/why-choose-section";

const AboutPage = () => {
  return (
    <>
      <Seo
        title="About Us"
        description="Learn how Labora connects talented professionals with verified companies — from one-click applications to fully tracked hiring pipelines."
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
      />
      <AboutHero />
      <StorySection />
      <PlatformWorkflowSection />
      <TalentPipelineSection />
      <WhyChooseSection />
      <TeamSection />
    </>
  );
};

export default AboutPage;
