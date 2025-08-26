import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Verified } from "lucide-react";
import { useState, useEffect } from "react";

const DynamicReviews = () => {
  const [currentReviews, setCurrentReviews] = useState([]);
  const [timeUntilNext, setTimeUntilNext] = useState(0);

  const reviewPool = [
    {
      name: "CryptoKnight",
      rating: 5,
      text: "Perfect PayPal logs, worked instantly.<br/>Made $800 in first hour.<br/>reapergang 💯",
      date: "2 minutes ago",
      verified: true,
      category: "PayPal"
    },
    {
      name: "AnonymousBuyer",
      rating: 5,
      text: "Apple Pay cards are legit.<br/>Instant delivery, clean method included.<br/>Already ordered 3 times.",
      date: "8 minutes ago",
      verified: true,
      category: "Apple Pay"
    },
    {
      name: "LoginHunter",
      rating: 5,
      text: "Banking access was golden.<br/>Full access, high balance, no issues.<br/>REAPER = GOD",
      date: "15 minutes ago",
      verified: false,
      category: "Banking"
    },
    {
      name: "CashoutKing",
      rating: 5,
      text: "Cloned cards arrived fast, premium quality.<br/>Used at ATM without problems.<br/>10/10",
      date: "23 minutes ago",
      verified: true,
      category: "Physical"
    },
    {
      name: "CryptoWhale",
      rating: 5,
      text: "Wallet access delivered in 3 mins. Had $12k balance. Best investment ever made.",
      date: "31 minutes ago",
      verified: true,
      category: "Crypto"
    },
    {
      name: "CardMaster",
      rating: 5,
      text: "Amazon cards work perfect. Bought $500 worth of stuff. Support is instant on TG.",
      date: "45 minutes ago",
      verified: false,
      category: "Amazon"
    },
    {
      name: "DigitalNinja",
      rating: 5,
      text: "Been using reaper for months. Never had a dead product. Quality is unmatched.",
      date: "1 hour ago",
      verified: true,
      category: "General"
    },
    {
      name: "ProCasher",
      rating: 5,
      text: "Tutorial videos are clear. Made first cashout same day. Support helped me 24/7.",
      date: "1 hour ago",
      verified: false,
      category: "Support"
    },
    {
      name: "BankingPro",
      rating: 5,
      text: "Fresh bank logs every time. No fraud blocks. Clean history. Reaper delivers 🔥",
      date: "2 hours ago",
      verified: true,
      category: "Banking"
    },
    {
      name: "PayPalGod",
      rating: 5,
      text: "PP business accounts hit different. Instant transfers, high limits. Worth every sat.",
      date: "2 hours ago",
      verified: true,
      category: "PayPal"
    },
    {
      name: "SwipeExpert",
      rating: 5,
      text: "Physical cards magnetic strip perfect. No decline issues. Packaging discreet.",
      date: "3 hours ago",
      verified: false,
      category: "Physical"
    },
    {
      name: "WalletBreaker",
      rating: 5,
      text: "Crypto wallets had more than advertised. Found hidden coins. Bonus profit!",
      date: "3 hours ago",
      verified: true,
      category: "Crypto"
    }
  ];

  useEffect(() => {
    // Initialize with 6 random reviews
    const shuffled = [...reviewPool].sort(() => 0.5 - Math.random());
    setCurrentReviews(shuffled.slice(0, 6));
    
    // Set timer for next review update (2-4 hours)
    const nextUpdate = Math.random() * 2 + 2; // 2-4 hours
    setTimeUntilNext(nextUpdate * 3600);

    const updateTimer = setInterval(() => {
      setTimeUntilNext(prev => {
        if (prev <= 1) {
          // Time to add new review
          const availableReviews = reviewPool.filter(
            review => !currentReviews.some(current => current.name === review.name)
          );
          
          if (availableReviews.length > 0) {
            const newReview = availableReviews[Math.floor(Math.random() * availableReviews.length)];
            setCurrentReviews(prev => [newReview, ...prev.slice(0, 5)]);
          }
          
          // Reset timer
          return (Math.random() * 2 + 2) * 3600;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(updateTimer);
  }, []);

  const formatTimeLeft = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  return (
    <section className="py-16 bg-secondary/20" id="reviews">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Live Customer <span className="bg-gradient-primary bg-clip-text text-transparent">Reviews</span>
          </h2>
          <p className="text-muted-foreground mb-4">
            Real feedback from anonymous crypto buyers
          </p>
          <Badge variant="outline" className="text-xs">
            Next review in {formatTimeLeft(timeUntilNext)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {currentReviews.map((review, index) => (
            <Card 
              key={`${review.name}-${index}`} 
              className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300 animate-fade-in relative overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < review.rating ? 'text-warning fill-warning' : 'text-muted'}`} 
                        />
                      ))}
                    </div>
                    {review.verified && (
                      <Verified className="h-3 w-3 text-success" />
                    )}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {review.category}
                  </Badge>
                </div>
                
                <p className="text-sm text-foreground/90 mb-4 line-clamp-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: `"${review.text}"` }}>
                </p>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-primary">{review.name}</span>
                  <span className="text-muted-foreground">{review.date}</span>
                </div>
                
                {index === 0 && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-success/20 text-success border-success/30 text-xs animate-pulse">
                      NEW
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Verified className="h-4 w-4 text-success" />
              <span>Verified Purchase</span>
            </div>
            <div>
              <span className="text-primary font-semibold">3,247</span> Total Reviews
            </div>
            <div>
              <span className="text-warning font-semibold">4.9</span> Average Rating
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicReviews;