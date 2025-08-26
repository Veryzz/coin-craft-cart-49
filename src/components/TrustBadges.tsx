import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Users, Clock, CheckCircle, Globe } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    {
      icon: Shield,
      text: "100% Anonymous",
      color: "text-success"
    },
    {
      icon: Zap,
      text: "Instant Delivery",
      color: "text-warning"
    },
    {
      icon: Users,
      text: "3,200+ Customers",
      color: "text-primary"
    },
    {
      icon: Clock,
      text: "24/7 Support",
      color: "text-blue-400"
    },
    {
      icon: CheckCircle,
      text: "Verified Products",
      color: "text-success"
    },
    {
      icon: Globe,
      text: "Worldwide Access",
      color: "text-purple-400"
    }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {badges.map((badge, index) => (
        <Badge 
          key={index}
          variant="outline" 
          className="bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background/70 transition-all duration-300"
        >
          <badge.icon className={`h-3 w-3 mr-1 ${badge.color}`} />
          {badge.text}
        </Badge>
      ))}
    </div>
  );
};

export default TrustBadges;