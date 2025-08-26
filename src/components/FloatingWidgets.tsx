import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, MessageCircle, TrendingUp, Shield, Zap, X } from "lucide-react";

const FloatingWidgets = () => {
  const [showNotifications, setShowNotifications] = useState(true);
  const [recentSales, setRecentSales] = useState([
    { product: "Apple Pay CC", amount: "$29.99", time: "2m ago" },
    { product: "Virtual Cards", amount: "$29.99", time: "5m ago" },
    { product: "Banking Tools", amount: "$45.99", time: "8m ago" }
  ]);
  const [currentSale, setCurrentSale] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSale(prev => (prev + 1) % recentSales.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [recentSales.length]);

  if (!showNotifications) return null;

  return (
    <>
      {/* Live Sales Notification */}
      <div className="fixed bottom-6 left-6 z-40 animate-fade-in">
        <Card className="bg-gradient-card border-success/30 shadow-glow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium text-success">Recent Sale!</p>
                  <p className="text-xs text-muted-foreground">
                    {recentSales[currentSale].product} • {recentSales[currentSale].amount}
                  </p>
                  <p className="text-xs text-muted-foreground">{recentSales[currentSale].time}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowNotifications(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Badge */}
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-40">
        <Card className="bg-gradient-card border-primary/30 rounded-l-lg rounded-r-none shadow-glow">
          <CardContent className="p-3 text-center">
            <Shield className="h-6 w-6 text-primary mx-auto mb-1" />
            <p className="text-xs font-bold text-primary">100%</p>
            <p className="text-xs text-muted-foreground">SECURE</p>
          </CardContent>
        </Card>
      </div>

      {/* Viewer Counter */}
      <div className="fixed top-20 right-6 z-40">
        <Badge className="bg-destructive/20 text-destructive border-destructive/30 animate-pulse">
          <Eye className="h-3 w-3 mr-1" />
          {47 + Math.floor(Math.random() * 15)} viewing
        </Badge>
      </div>

      {/* Telegram CTA */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button 
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300 animate-bounce"
          onClick={() => window.open('https://t.me/balancedcards', '_blank')}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Need Help?
        </Button>
      </div>

      {/* Trust Indicators */}
      <div className="fixed bottom-24 right-6 z-40 space-y-2">
        <Badge className="bg-success/20 text-success border-success/30 block">
          <Zap className="h-3 w-3 mr-1" />
          2-5 min delivery
        </Badge>
        <Badge className="bg-warning/20 text-warning border-warning/30 block">
          <TrendingUp className="h-3 w-3 mr-1" />
          5.0★ rated
        </Badge>
      </div>
    </>
  );
};

export default FloatingWidgets;