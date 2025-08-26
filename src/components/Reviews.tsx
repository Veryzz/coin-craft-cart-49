import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Reviews = () => {
  const reviews = [
    {
      name: "Anonymous User",
      rating: 5,
      text: "Reaper 5/5 for your help with 2fa bypass",
      date: "2 days ago"
    },
    {
      name: "SatisfiedCustomer",
      rating: 5,
      text: "FINALLY! This definitely the best bot I ever had, and lifetime for $199 cheappp, all scripts I need",
      date: "1 week ago"
    },
    {
      name: "PayPalUser",
      rating: 5,
      text: "Best vendor i always had issues with hitting paypal now no more ty reaper",
      date: "3 days ago"
    },
    {
      name: "TikTokFan",
      rating: 5,
      text: "Best seller there is on tiktok",
      date: "1 day ago"
    },
    {
      name: "ReturningCustomer",
      rating: 5,
      text: "best service out there 10/10",
      date: "5 days ago"
    },
    {
      name: "QuickDelivery",
      rating: 5,
      text: "5/5 STARS for insta delivery and support",
      date: "4 days ago"
    }
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Customer <span className="bg-gradient-primary bg-clip-text text-transparent">Reviews</span>
          </h2>
          <p className="text-muted-foreground">
            Join over 1,670 satisfied customers who trust REAPERCARDS
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-glow transition-all duration-300 animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < review.rating ? 'text-warning fill-warning' : 'text-muted'}`} 
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-4">
                  "{review.text}"
                </p>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium">{review.name}</span>
                  <span className="text-muted-foreground">{review.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;