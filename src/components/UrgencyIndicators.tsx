import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, TrendingUp, Users, Clock } from "lucide-react";

const UrgencyIndicators = () => {
  const [stockLevels] = useState({
    "Apple Pay Cards": Math.floor(Math.random() * 10) + 3,
    "Virtual Cards": Math.floor(Math.random() * 15) + 5,
    "Banking Tools": Math.floor(Math.random() * 8) + 2
  });
  
  const [demandLevel, setDemandLevel] = useState("HIGH");

  useEffect(() => {
    const levels = ["HIGH", "VERY HIGH", "EXTREME"];
    const interval = setInterval(() => {
      setDemandLevel(levels[Math.floor(Math.random() * levels.length)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-8 bg-destructive/5 border-y border-destructive/20">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Stock Alert */}
          <Alert className="border-destructive/30 bg-destructive/10">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-destructive font-medium">
              <div className="flex items-center justify-between">
                <span>LOW STOCK ALERT</span>
                <Badge variant="destructive" className="animate-pulse">
                  {Math.min(...Object.values(stockLevels))} left
                </Badge>
              </div>
            </AlertDescription>
          </Alert>

          {/* Demand Indicator */}
          <Alert className="border-warning/30 bg-warning/10">
            <TrendingUp className="h-4 w-4 text-warning" />
            <AlertDescription className="text-warning font-medium">
              <div className="flex items-center justify-between">
                <span>DEMAND LEVEL</span>
                <Badge className="bg-warning text-warning-foreground animate-pulse">
                  {demandLevel}
                </Badge>
              </div>
            </AlertDescription>
          </Alert>

          {/* Active Users */}
          <Alert className="border-success/30 bg-success/10">
            <Users className="h-4 w-4 text-success" />
            <AlertDescription className="text-success font-medium">
              <div className="flex items-center justify-between">
                <span>BUYING NOW</span>
                <Badge className="bg-success text-success-foreground animate-pulse">
                  {25 + Math.floor(Math.random() * 15)} users
                </Badge>
              </div>
            </AlertDescription>
          </Alert>
        </div>

        {/* Flash Sale Timer */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-lg border border-primary/30">
            <Clock className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-primary font-bold">FLASH SALE ENDS IN: </span>
            <Badge className="bg-primary text-primary-foreground font-mono animate-pulse">
              {String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}:
              {String(Math.floor(Math.random() * 60)).padStart(2, '0')}:
              {String(Math.floor(Math.random() * 60)).padStart(2, '0')}
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrgencyIndicators;