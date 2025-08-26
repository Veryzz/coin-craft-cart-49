import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Users, Star, ArrowRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import heroGlobe from "@/assets/hero-globe.jpg";
import AnimatedGlobe from "./AnimatedGlobe";
import TrustBadges from "./TrustBadges";

const Hero = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroGlobe} 
          alt="High-tech globe background" 
          className="w-full h-full object-cover opacity-15"
        />
        <AnimatedGlobe />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/30 to-background/60" />
      </div>

      {/* Main Content - Centered */}
      <div className="container relative z-10 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Trust Indicators */}
          <div className="mb-8">
            <TrustBadges />
          </div>

          {/* Main Heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight">
            <span className="block text-shadow-cyber">REAPER</span>
            <span className="block bg-gradient-primary bg-clip-text text-transparent text-shadow-neon">
              CARDS
            </span>
            <span className="block text-2xl md:text-4xl lg:text-5xl font-medium text-foreground/80 mt-4">
              #1 AUTO-SHOP
            </span>
          </h1>

          {/* Subtitle */}
          <div className="max-w-4xl mx-auto mb-12">
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 leading-relaxed">
              🔥 <span className="text-primary font-semibold">INSTANT DIGITAL DELIVERY</span> • 
              <span className="text-primary font-semibold"> 100% ANONYMOUS</span> • 
              <span className="text-primary font-semibold"> CRYPTO ONLY</span> 🔥
            </p>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
              Premium cards & accounts delivered in minutes.<br/>
              Zero logs, maximum profits, guaranteed reliability.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8 py-4 h-auto group"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <ShoppingCart className="h-5 w-5 mr-3" />
              BROWSE PRODUCTS
              <ArrowRight className="h-5 w-5 ml-3 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-lg px-8 py-4 h-auto glow-border"
              onClick={() => window.open('https://t.me/balancedcards', '_blank')}
            >
              <Shield className="h-5 w-5 mr-3" />
              Live Support
            </Button>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 glow-border">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 animate-cyber-pulse">847+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Products Sold</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 glow-border">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 animate-cyber-pulse">312+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Happy Customers</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 glow-border">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2 animate-cyber-pulse">5.0★</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Trusted Rating</div>
            </div>
          </div>

          {/* Quick Access Links */}
          <div className="mt-16 pt-8 border-t border-border/50">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link 
                to="/products" 
                className="text-foreground/60 hover:text-primary transition-colors hover:underline"
              >
                View All Products
              </Link>
              <span className="text-border">•</span>
              <a 
                href="#reviews" 
                className="text-foreground/60 hover:text-primary transition-colors hover:underline"
              >
                Customer Reviews
              </a>
              <span className="text-border">•</span>
              <a 
                href="#support" 
                className="text-foreground/60 hover:text-primary transition-colors hover:underline"
              >
                24/7 Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;