import { Badge } from "@/components/ui/badge";
import { Shield, Clock, Star, Zap, Lock, Award } from "lucide-react";

const TrustIndicators = () => {
  const indicators = [
    { icon: Clock, text: "2-5 MIN DELIVERY", color: "text-success" },
    { icon: Shield, text: "ANONYMOUS", color: "text-primary" },
    { icon: Lock, text: "CRYPTO ONLY", color: "text-warning" },
    { icon: Star, text: "5.0 RATED", color: "text-warning" },
    { icon: Zap, text: "3166+ SOLD", color: "text-success" },
    { icon: Award, text: "1670+ CUSTOMERS", color: "text-primary" }
  ];

  return (
    <div className="py-8 bg-black/20 border-y border-border">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {indicators.map((indicator, index) => (
            <div 
              key={index}
              className="flex items-center justify-center gap-2 p-3 bg-gradient-card rounded-lg border border-border/50 hover:shadow-glow transition-all duration-300"
            >
              <indicator.icon className={`h-4 w-4 ${indicator.color}`} />
              <span className="text-xs font-bold">{indicator.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;