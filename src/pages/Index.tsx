import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CarDealsSection from "@/components/CarDealsSection";
import AIAssistantSection from "@/components/AIAssistantSection";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <CarDealsSection />
      <AIAssistantSection />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default Index;
