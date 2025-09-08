import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/CartContext";

// Import correct product images
import applePayImage from "@/assets/apple-pay-sellpass.jpg";
import paypalLoginsImage from "@/assets/paypal-logins-sellpass.jpg";
import cryptoWalletImage from "@/assets/crypto-wallet-sellpass.jpg";
import clonedCardsImage from "@/assets/cloned-cards-sellpass.jpg";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  inStock: boolean;
  category: string;
  featured?: boolean;
}

const MobileProductCarousel = () => {
  const { addItem } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const products: Product[] = [
    {
      id: "apple-pay-cc",
      title: "APPLE PAY CC | LINKABLE",
      description: "Card that easily links to Apple PAY (500-900) Method Included!",
      price: "29.99",
      image: applePayImage,
      rating: 5,
      inStock: true,
      category: "Digital Cards",
      featured: true
    },
    {
      id: "paypal-logins",
      title: "PAYPAL LOGINS BALANCED | FULL ACCESS",
      description: "PayPal Login + Random Balance + CC and BANK (Method included)",
      price: "25.00",
      image: paypalLoginsImage,
      rating: 5,
      inStock: true,
      category: "Account Access"
    },
    {
      id: "crypto-wallet",
      title: "STOLEN CRYPTO WALLET",
      description: "Stolen crypto wallet files with malware, random balance unchecked.",
      price: "39.99",
      image: cryptoWalletImage,
      rating: 5,
      inStock: true,
      category: "Crypto Access"
    },
    {
      id: "cloned-cards",
      title: "CLONED CARDS (PHYSICALS)",
      description: "Cloned Physicals for real life usage. (Balanced)",
      price: "68.99",
      image: clonedCardsImage,
      rating: 5,
      inStock: true,
      category: "Physical Cards",
      featured: true
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const handleAddToCart = (product: Product) => {
    if (product.inStock) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category
      });
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto sm:max-w-2xl lg:max-w-7xl">
      {/* Mobile: Single card view, Tablet/Desktop: Multiple cards */}
      <div className="relative overflow-hidden">
        {/* Mobile Single Card View */}
        <div className="block sm:hidden">
          <Card className="group bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow">
            <CardContent className="p-0">
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={products[currentIndex].image}
                  alt={products[currentIndex].title}
                  className="w-full h-48 object-contain bg-muted/20"
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                
                {/* Stock Status */}
                <div className="absolute top-3 left-3">
                  <Badge 
                    variant={products[currentIndex].inStock ? "default" : "destructive"}
                    className="text-xs font-medium"
                  >
                    {products[currentIndex].inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>

                {/* Featured Badge */}
                {products[currentIndex].featured && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-gradient-primary text-xs font-medium">
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Rating */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1">
                  {[...Array(products[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-foreground mb-2 text-lg">
                  {products[currentIndex].title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {products[currentIndex].description}
                </p>
                <Badge variant="outline" className="text-xs mb-4">
                  {products[currentIndex].category}
                </Badge>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    ${products[currentIndex].price}
                  </div>
                  <Button
                    onClick={() => handleAddToCart(products[currentIndex])}
                    disabled={!products[currentIndex].inStock}
                    className="bg-gradient-primary hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Navigation */}
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="border-primary/30 hover:border-primary hover:bg-primary/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary shadow-glow"
                      : "bg-muted hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="border-primary/30 hover:border-primary hover:bg-primary/10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Tablet/Desktop: Multi-card view */}
        <div className="hidden sm:block">
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentIndex * (100 / Math.min(products.length, 2))}%)`,
                  width: `${Math.ceil(products.length / 2) * 100}%`
                }}
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 px-3"
                    style={{ width: `${100 / products.length}%` }}
                  >
                    <Card className="group bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:scale-105 h-full">
                      <CardContent className="p-0 h-full flex flex-col">
                        {/* Image Container */}
                        <div className="relative overflow-hidden rounded-t-lg">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-48 object-contain bg-muted/20 transition-transform duration-700 group-hover:scale-110"
                          />
                          
                          {/* Overlays */}
                          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                          
                          {/* Stock Status */}
                          <div className="absolute top-3 left-3">
                            <Badge 
                              variant={product.inStock ? "default" : "destructive"}
                              className="text-xs font-medium"
                            >
                              {product.inStock ? "In Stock" : "Out of Stock"}
                            </Badge>
                          </div>

                          {/* Featured Badge */}
                          {product.featured && (
                            <div className="absolute top-3 right-3">
                              <Badge className="bg-gradient-primary text-xs font-medium">
                                Featured
                              </Badge>
                            </div>
                          )}

                          {/* Rating */}
                          <div className="absolute bottom-3 left-3 flex items-center gap-1">
                            {[...Array(product.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                            ))}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {product.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {product.description}
                            </p>
                            <Badge variant="outline" className="text-xs mb-3">
                              {product.category}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-primary">
                              ${product.price}
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleAddToCart(product)}
                              disabled={!product.inStock}
                              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <ShoppingCart className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Navigation Arrows */}
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background/90 backdrop-blur-sm border-primary/30 hover:border-primary hover:bg-primary/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background/90 backdrop-blur-sm border-primary/30 hover:border-primary hover:bg-primary/10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Desktop Dots Indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: Math.ceil(products.length / 2) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary shadow-glow"
                      : "bg-muted hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileProductCarousel;