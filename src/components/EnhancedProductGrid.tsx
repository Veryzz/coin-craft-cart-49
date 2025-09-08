import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import MobileProductCarousel from "./MobileProductCarousel";

const EnhancedProductGrid = () => {
  return (
    <section id="products" className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Featured Products
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            🔥 Premium digital products with instant delivery and guaranteed quality 🔥
          </p>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </div>

        {/* Product Carousel */}
        <MobileProductCarousel />

        {/* View All Products Button */}
        <div className="text-center mt-16">
          <Link to="/products">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-4 h-auto group"
            >
              <ShoppingCart className="h-5 w-5 mr-3" />
              View All Products
              <ArrowRight className="h-5 w-5 ml-3 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          
          <p className="text-sm text-muted-foreground mt-4">
            🚀 Explore our complete collection of premium digital products
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/30">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-foreground mb-2">Instant Delivery</h3>
            <p className="text-sm text-muted-foreground">Get your products within minutes of purchase</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/30">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="font-semibold text-foreground mb-2">100% Anonymous</h3>
            <p className="text-sm text-muted-foreground">Complete privacy and security guaranteed</p>
          </div>
          <div className="text-center p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/30">
            <div className="text-3xl mb-2">💎</div>
            <h3 className="font-semibold text-foreground mb-2">Premium Quality</h3>
            <p className="text-sm text-muted-foreground">Only the highest quality products and services</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedProductGrid;