import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const CustomerTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      name: "CyberReaper99",
      product: "PayPal Account",
      rating: 5,
      text: "Instant delivery! Got my PayPal account working perfectly within 3 minutes. Customer for life! 🔥",
      verified: true
    },
    {
      name: "ShadowHawk",
      product: "Amazon Account",
      rating: 5,
      text: "Amazing service, completely anonymous and super fast delivery. Already made back the investment!",
      verified: true
    },
    {
      name: "Pr0x1m4",
      product: "Apple Pay",
      rating: 5,
      text: "Best shop ever! Clean products, instant support, and everything works as promised. Highly recommend!",
      verified: true
    },
    {
      name: "GhostProtocol",
      product: "Crypto Wallet",
      rating: 5,
      text: "Professional service, got multiple products and all work perfectly. Support responds in seconds!",
      verified: true
    },
    {
      name: "QuantumByte",
      product: "Banking Tools",
      rating: 5,
      text: "Quality products at fair prices. Delivery was instant and everything authenticated perfectly.",
      verified: true
    },
    {
      name: "VoidRunner",
      product: "Cards Bundle",
      rating: 5,
      text: "Reliable vendor! Got 5+ products and all working great. Love the anonymous payment options.",
      verified: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length]
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">
              What Our <span className="bg-gradient-primary bg-clip-text text-transparent">Customers Say</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust ReaperCards for premium digital goods
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {visibleTestimonials.map((testimonial, index) => (
            <Card key={`${currentIndex}-${index}`} className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-500 transform animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-sm font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.product}</div>
                    </div>
                  </div>
                  {testimonial.verified && (
                    <Badge className="bg-success/20 text-success border-success/30">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="flex items-center mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-warning fill-warning" />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
                  <Clock className="h-3 w-3 text-success" />
                  <span className="text-xs text-success font-medium">Verified Purchase</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 text-warning fill-warning" />
            <span>4.9/5 stars from 2,000+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerTestimonials;