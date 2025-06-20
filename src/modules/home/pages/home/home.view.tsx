import { Footer } from "react-day-picker";
import AgentLibrary from "../../components/agent-library";
import Benefits from "../../components/benefits";
import CTASection from "../../components/cta-section";
import FAQ from "../../components/faq";
import Features from "../../components/features";
import Header from "../../components/header";
import HeroSection from "../../components/hero-section";
import HowItWorks from "../../components/how-it-works";
import Testimonials from "../../components/testimonials";
import { useHomeModel } from "./home.model";

export function HomeView(props: ReturnType<typeof useHomeModel>) {
  const { agents, isAgentsLoading } = props

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <HowItWorks />
      <Features />
      <Benefits />
      <AgentLibrary agents={agents} isLoading={isAgentsLoading} />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}