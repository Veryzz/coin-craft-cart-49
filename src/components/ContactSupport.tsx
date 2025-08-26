import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, Headphones } from "lucide-react";

const ContactSupport = () => {
  return (
    <section className="py-16 bg-gradient-card">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Headphones className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold">We're here to help</h2>
          </div>
          
          <p className="text-muted-foreground mb-8">
            If you're in need of support for a product you purchased or just want to say hi, 
            please contact us using the options below.
          </p>

          <div className="flex justify-center">
            <Card className="hover:shadow-glow transition-all duration-300 max-w-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Telegram Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get instant support through our Telegram channel
                </p>
                <Button 
                  className="w-full bg-gradient-primary hover:shadow-glow"
                  onClick={() => window.open('https://t.me/balancedcards', '_blank')}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Contact on Telegram
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/30">
            <p className="text-sm text-primary font-semibold">
              💡 Pro Tip: Join our Telegram for faster support and exclusive deals!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSupport;