import { Footer } from "react-day-picker";
import AgentLibrary from "../../components/agent-library";
import Benefits from "../../components/benefits";
import CTASection from "../../components/cta-section";
import FAQ from "../../components/faq";
import Features from "../../components/features";
import Header from "../../components/header";
import HeroSection from "../../components/hero-section";
import HowItWorks from "../../components/how-it-works";
import { useHomeModel } from "./home.model";
import { useLocation } from "wouter";

export function HomeView(props: ReturnType<typeof useHomeModel>) {
  const {
    agents,
    categories,
    selectedCategory,
    isAgentsLoading,
    isCategoriesLoading,
    handleCategoryChange
  } = props;

  const [, navigate] = useLocation();

  const handleSelectAgent = () => {
    // Na home, redireciona para a página de login se não estiver logado
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <HowItWorks />
      <Features />
      <Benefits />
      <AgentLibrary
        agents={agents}
        categories={categories}
        selectedCategory={selectedCategory}
        isLoading={isAgentsLoading}
        isCategoriesLoading={isCategoriesLoading}
        onCategoryChange={handleCategoryChange}
        onSelectAgent={handleSelectAgent}
      />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}