import { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";
import MobileOptimizedGrid from "./MobileOptimizedGrid";
import ProductCard from "./ProductCard";

// Import original ReaperCards images
import reaperApplePay from "@/assets/reaper-apple-pay.jpg";
import reaperPaypal from "@/assets/reaper-paypal.jpg"; 
import reaperCryptoWallet from "@/assets/reaper-crypto-wallet.jpg";
import reaperAmazonStore from "@/assets/reaper-amazon-store.jpg";
import reaperAmazonAged from "@/assets/reaper-amazon-aged.jpg";
import reaperClonedCards from "@/assets/reaper-cloned-cards.jpg";
import reaperVisaPrepaid from "@/assets/reaper-visa-prepaid.jpg";
import reaperUhqDumps from "@/assets/reaper-uhq-dumps.jpg";
import reaperCashapp from "@/assets/reaper-cashapp.jpg";
import reaperRevolut from "@/assets/reaper-revolut.jpg";
import reaperVirtualCard from "@/assets/reaper-virtual-card.jpg";
import reaperCardingTutorial from "@/assets/reaper-carding-tutorial.jpg";

// Fallback images for products without specific images
import banking from "@/assets/banking-branded.jpg";
import applePay from "@/assets/apple-pay-branded.jpg";

const SearchableProductGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Real products from ReaperCards with enhanced descriptions for profit appeal
  const products = [
    {
      id: "apple-pay-linkable",
      title: "Apple Pay Cards | Premium Linkable",
      description: "High-balance Apple Pay cards ($500-900) that link seamlessly. Complete method included for guaranteed success. Fresh daily stock with 95% success rate.",
      price: "29.99",
      originalPrice: "59.99",
      image: reaperApplePay,
      rating: 5,
      inStock: true,
      category: "Digital Cards",
      featured: true,
      profitPotential: "$500-900"
    },
    {
      id: "paypal-balanced",
      title: "PayPal Logins | Balanced & Verified",
      description: "Full access PayPal accounts with random balances, linked payment methods, and complete credentials. Method included for safe cashout.",
      price: "25.00",
      originalPrice: "49.99",
      image: reaperPaypal,
      rating: 5,
      inStock: true,
      category: "Payment Access",
      profitPotential: "Random Balance"
    },
    {
      id: "crypto-wallet-stolen",
      title: "Crypto Wallets | Pre-loaded",
      description: "Crypto wallet files with random unchecked balances. Various cryptocurrencies included with secure transfer methods.",
      price: "39.99",
      originalPrice: "79.99",
      image: reaperCryptoWallet,
      rating: 5,
      inStock: true,
      category: "Crypto Access",
      featured: true,
      profitPotential: "Random Crypto"
    },
    {
      id: "amazon-prepaid",
      title: "Amazon Store Cards | $1000+",
      description: "Prepaid Amazon cards with $1000+ balance that link easily for purchases. Complete method and setup guide included.",
      price: "20.99",
      originalPrice: "39.99",
      image: reaperAmazonStore,
      rating: 5,
      inStock: false,
      category: "Gift Cards",
      profitPotential: "$1000+"
    },
    {
      id: "amazon-aged-account",
      title: "Amazon Aged Accounts | 4-6 Years",
      description: "Established Amazon accounts (4-6 years old) perfect for successful card usage. High trust score and clean history.",
      price: "24.99",
      originalPrice: "49.99",
      image: reaperAmazonAged,
      rating: 5,
      inStock: true,
      category: "Account Access",
      profitPotential: "High Success"
    },
    {
      id: "cloned-physicals",
      title: "Cloned Physical Cards | Balanced",
      description: "High-quality cloned physical cards for real-world usage. Pre-balanced and tested. Discrete packaging included.",
      price: "68.99",
      originalPrice: "99.99",
      image: reaperClonedCards,
      rating: 5,
      inStock: true,
      category: "Physical Cards",
      featured: true,
      profitPotential: "Real World Use"
    },
    {
      id: "visa-prepaid-cvv",
      title: "Visa Prepaid CVV | $500 Balance",
      description: "Prepaid Visa cards with confirmed $500 balance. Cashout method included for guaranteed success.",
      price: "29.99",
      originalPrice: "59.99",
      image: reaperVisaPrepaid,
      rating: 5,
      inStock: false,
      category: "Digital Cards",
      profitPotential: "$500"
    },
    {
      id: "uhq-dumps-pin",
      title: "UHQ Dumps + PIN | Premium",
      description: "Ultra high-quality dumps with PIN codes. Usage method included for ATM and POS transactions.",
      price: "29.99",
      originalPrice: "49.99",
      image: reaperUhqDumps,
      rating: 5,
      inStock: true,
      category: "Banking Access",
      profitPotential: "ATM Ready"
    },
    {
      id: "cashapp-balanced",
      title: "CashApp Logins | Full Access",
      description: "CashApp accounts with random balance, linked payment methods, and email access. Complete method included.",
      price: "29.99",
      originalPrice: "59.99",
      image: reaperCashapp,
      rating: 5,
      inStock: false,
      category: "Payment Access",
      profitPotential: "Random Balance"
    },
    {
      id: "revolut-balanced",
      title: "REVOLUT LOGINS BALANCED | FULL ACCESS",
      description: "Revolut Login + Random Balance + CC and BANK (Method included)",
      price: "34.99",
      originalPrice: "69.99",
      image: reaperRevolut,
      rating: 5,
      inStock: true,
      category: "Banking Access",
      profitPotential: "EU Banking"
    },
    {
      id: "virtual-card-fullz",
      title: "VIRTUAL CARD DETAILS (FULLZ)",
      description: "High Quality spammed CC's good balance. (method included)",
      price: "29.99",
      originalPrice: "49.99",
      image: reaperVirtualCard,
      rating: 5,
      inStock: true,
      category: "Digital Cards",
      profitPotential: "Good Balance"
    },
    {
      id: "clone-tutorial",
      title: "Clone Writing Tutorial | Video Course",
      description: "Complete video tutorial on professional clone writing techniques. Master the art with step-by-step guidance.",
      price: "49.00",
      originalPrice: "99.99",
      image: reaperClonedCards,
      rating: 5,
      inStock: true,
      category: "Tutorials",
      profitPotential: "Learn & Earn"
    },
    {
      id: "online-carding-tutorial",
      title: "ONLINE CARDING TUTORIAL (VIDEO)",
      description: "FULL VIDEO ON HOW TO CARD ONLINE",
      price: "49.00",
      originalPrice: "99.99",
      image: reaperCardingTutorial,
      rating: 5,
      inStock: true,
      category: "Tutorials",
      profitPotential: "Expert Skills"
    },
    {
      id: "paypal-carding-tutorial",
      title: "PayPal Carding Tutorial | Success Methods",
      description: "Complete video guide on PayPal carding with our verified accounts. High success rate methods revealed.",
      price: "49.00",
      originalPrice: "99.99",
      image: reaperPaypal,
      rating: 5,
      inStock: true,
      category: "Tutorials",
      profitPotential: "PayPal Expert"
    }
  ];

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, products]);

  return (
    <section className="py-12 bg-secondary/10" id="products">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Premium <span className="bg-gradient-primary bg-clip-text text-transparent">Digital Products</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Professional-grade tools and access. Instant crypto delivery. Maximum profit potential.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-success/20 text-success border-success/30">
              🚀 Instant Delivery
            </Badge>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              💰 High Profit Potential
            </Badge>
            <Badge className="bg-warning/20 text-warning border-warning/30">
              🔐 100% Anonymous
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              📈 95% Success Rate
            </Badge>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products, categories, or methods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background/50 border-primary/20 focus:border-primary/50"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-background/90 border border-primary/20 rounded-md px-3 py-2 text-sm focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 relative z-50"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            Showing <span className="text-primary font-medium">{filteredProducts.length}</span> products
            {searchTerm && (
              <span> for "<span className="text-primary">{searchTerm}</span>"</span>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              No products found matching your criteria
            </div>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-6 bg-gradient-card rounded-lg border border-primary/30">
          <h3 className="text-xl font-bold mb-2">🔥 Fresh Stock Added Daily</h3>
          <p className="text-muted-foreground mb-4">
            Join 10,000+ satisfied customers. Professional service since 2019.
          </p>
          <Badge className="bg-primary text-primary-foreground animate-pulse">
            💎 T.ME/BALANCEDCARDS - Direct Contact
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default SearchableProductGrid;