import Header from '@/modules/home/components/header';
import HeroSection from '@/modules/home/components/hero-section';
import HowItWorks from '@/modules/home/components/how-it-works';
import Features from '@/modules/home/components/features';
import Benefits from '@/modules/home/components/benefits';
import AgentLibrary from '@/modules/home/components/agent-library';
import Testimonials from '@/modules/home/components/testimonials';
import FAQ from '@/modules/home/components/faq';
import CTASection from '@/modules/home/components/cta-section';
import Footer from '@/modules/home/components/footer';

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <HowItWorks />
      <Features />
      <Benefits />
      <AgentLibrary />
      <Testimonials />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}

export default HomePage;
