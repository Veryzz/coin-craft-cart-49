import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustIndicators from "@/components/TrustIndicators";
import LiveStats from "@/components/LiveStats";
import EnhancedProductGrid from "@/components/EnhancedProductGrid";
import CryptoPayments from "@/components/CryptoPayments";
import DynamicReviews from "@/components/DynamicReviews";
import CustomerTestimonials from "@/components/CustomerTestimonials";
import FAQ from "@/components/FAQ";
import LiveChat from "@/components/LiveChat";
import ContactSupport from "@/components/ContactSupport";
import Footer from "@/components/Footer";
import FloatingWidgets from "@/components/FloatingWidgets";
import MatrixRain from "@/components/MatrixRain";

const Index = () => {
  console.log("Index component is rendering");
  
  return (
    <div className="min-h-screen bg-background animate-fade-in relative">
      <div style={{position: 'fixed', top: 0, left: 0, color: 'white', background: 'red', padding: '10px', zIndex: 9999}}>
        DEBUG: Index component loaded
      </div>
      <MatrixRain />
      <Header />
      <Hero />
      <TrustIndicators />
      <LiveStats />
      <EnhancedProductGrid />
      <CustomerTestimonials />
      <CryptoPayments />
      <DynamicReviews />
      <FAQ />
      <ContactSupport />
      <Footer />
      <LiveChat />
    </div>
  );
};

export default Index;
