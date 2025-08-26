import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, User, Shield, Coins, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import reaperLogo from "@/assets/reapercards-logo.png";

const Header = () => {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/90 sticky top-0 z-50 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="flex items-center space-x-3">
              <img 
                src={reaperLogo} 
                alt="REAPERCARDS" 
                className="h-10 w-auto transition-transform group-hover:scale-105" 
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  REAPERCARDS
                </span>
                <Badge variant="secondary" className="text-xs w-fit glow-border">
                  <Coins className="h-3 w-3 mr-1" />
                  AUTO-SHOP
                </Badge>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 hover:shadow-glow px-3 py-2 rounded-md"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 hover:shadow-glow px-3 py-2 rounded-md"
            >
              All Products
            </Link>
            <a 
              href="#reviews" 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 hover:shadow-glow px-3 py-2 rounded-md"
            >
              Reviews
            </a>
            <button 
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 hover:shadow-glow px-3 py-2 rounded-md"
              onClick={() => window.open('https://t.me/balancedcards', '_blank')}
            >
              Support
            </button>
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative group">
              <Button 
                variant="outline" 
                size="sm"
                className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-primary">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Support Button */}
            <Button 
              size="sm"
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-sm font-medium hidden sm:flex"
              onClick={() => window.open('https://t.me/balancedcards', '_blank')}
            >
              <Shield className="h-4 w-4 mr-2" />
              Live Support
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden border-primary/30"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
            <nav className="py-4 space-y-2">
              <Link 
                to="/" 
                className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                All Products
              </Link>
              <a 
                href="#reviews" 
                className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reviews
              </a>
              <button 
                className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-md transition-all duration-300"
                onClick={() => {
                  window.open('https://t.me/balancedcards', '_blank');
                  setIsMobileMenuOpen(false);
                }}
              >
                Support
              </button>
              <div className="px-4 pt-2">
                <Button 
                  size="sm"
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 text-sm font-medium"
                  onClick={() => {
                    window.open('https://t.me/balancedcards', '_blank');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Live Support
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;