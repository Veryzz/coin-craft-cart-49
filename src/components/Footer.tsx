import { Shield, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                REAPERCARDS
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium digital cards & accounts delivered instantly.<br/>
              100% anonymous • Crypto only • 5-minute delivery guaranteed.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">PayPal Accounts</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Amazon Accounts</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Apple Pay Access</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Crypto Wallets</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Instant Delivery Guide</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Payment Methods</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Replacement Guarantee</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => window.open('https://t.me/balancedcards', '_blank')}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Live Chat 24/7
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => window.open('https://t.me/balancedcards', '_blank')}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 REAPERCARDS. All rights reserved. | Instant delivery • Anonymous payments • 24/7 support</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;