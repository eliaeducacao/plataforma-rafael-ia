import { useLpModel } from "./lp.model";
import HeroSection from "../../components/hero-section";
import DemoSection from "../../components/demo-section";
import ChatDemoSection from "../../components/chat-demo-section";
import AgentsSection from "../../components/agents-section";
import BenefitsSection from "../../components/benefits-section";
import TestimonialsSection from "../../components/testimonials-section";
import PricingSection from "../../components/pricing-section";
import PerformanceSection from "../../components/performance-section";
import CTASection from "../../components/cta-section";
import Footer from "../../components/footer";

export function LpView() {
  const model = useLpModel();
  return (
    <div className="min-h-screen bg-background">
      <HeroSection onStartTrial={model.handleStartTrial} isStartingTrial={model.isStartingTrial} />
      <DemoSection />
      <ChatDemoSection />
      <AgentsSection
        agents={model.agents}
        categories={model.categories}
        selectedCategory={model.selectedCategory}
        isLoading={model.isAgentsLoading}
        isCategoriesLoading={model.isCategoriesLoading}
        onCategoryChange={model.handleCategoryChange}
        onSelectAgent={model.handleSelectAgent}
      />
      <BenefitsSection />
      <TestimonialsSection />
      <PricingSection onStartTrial={model.handleStartTrial} isStartingTrial={model.isStartingTrial} />
      <PerformanceSection />
      <CTASection onStartTrial={model.handleStartTrial} isStartingTrial={model.isStartingTrial} />
      <Footer />
    </div>
  );
}