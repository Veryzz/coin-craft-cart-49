import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, ShoppingBag, Star } from "lucide-react";

const LiveStats = () => {
  const [stats, setStats] = useState({
    onlineUsers: 47,
    recentSales: 8,
    totalProducts: 3166,
    satisfaction: 5.0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        onlineUsers: Math.floor(Math.random() * 20) + 35,
        recentSales: Math.floor(Math.random() * 5) + 5
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-gradient-card">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Live Activity</span>
          </h2>
          <p className="text-muted-foreground">Real-time marketplace statistics</p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-success/30 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-success mr-2" />
                <Badge className="bg-success/20 text-success">LIVE</Badge>
              </div>
              <div className="text-2xl font-bold text-success animate-pulse">{stats.onlineUsers}</div>
              <div className="text-sm text-muted-foreground">Users Online</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-primary/30 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-primary mr-2" />
                <Badge className="bg-primary/20 text-primary">24H</Badge>
              </div>
              <div className="text-2xl font-bold text-primary animate-pulse">{stats.recentSales}</div>
              <div className="text-sm text-muted-foreground">Recent Sales</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-warning/30 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <ShoppingBag className="h-6 w-6 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold text-warning">{stats.totalProducts.toLocaleString()}+</div>
              <div className="text-sm text-muted-foreground">Products Sold</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-success/30 hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Star className="h-6 w-6 text-warning mx-auto mb-2 fill-current" />
              <div className="text-2xl font-bold text-warning">{stats.satisfaction}⭐</div>
              <div className="text-sm text-muted-foreground">Trust Rating</div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/30">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-success font-medium">All systems operational</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;