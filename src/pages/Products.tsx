import Header from "@/components/Header";
import SearchableProductGrid from "@/components/SearchableProductGrid";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";
import MatrixRain from "@/components/MatrixRain";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Products = () => {
  return (
    <div className="min-h-screen bg-background animate-fade-in relative">
      <MatrixRain />
      <Header />
      
      {/* Page Header */}
      <section className="pt-20 pb-8 bg-gradient-to-r from-background via-background/90 to-background">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Complete <span className="bg-gradient-primary bg-clip-text text-transparent">Product Catalog</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Browse our full collection of premium digital products. All items include methods and 24/7 support.
            </p>
          </div>
        </div>
      </section>

      <SearchableProductGrid />
      <Footer />
      <LiveChat />
    </div>
  );
};

export default Products;