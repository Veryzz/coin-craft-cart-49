import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Clock } from "lucide-react";
import ProductModal from "./ProductModal";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  profitPotential?: string;
  image: string;
  rating: number;
  inStock: boolean;
  stock?: number;
  category: string;
  featured?: boolean;
}

const ProductCard = ({ id, title, description, price, originalPrice, profitPotential, image, rating, inStock, stock, category, featured }: ProductCardProps) => {
  return (
    <ProductModal 
      id={id} 
      title={title} 
      description={description} 
      price={price} 
      image={image} 
      rating={rating} 
      inStock={inStock}
      stock={stock}
      category={category}
    >
      <Card className={`group hover:shadow-card transition-all duration-300 bg-gradient-card border-border/50 overflow-hidden cursor-pointer ${featured ? 'ring-2 ring-primary/50' : ''}`}>
        <div className="relative">
          <img 
            src={image} 
            alt={title}
            className="w-full h-52 object-contain bg-muted/20 group-hover:scale-105 transition-transform duration-300"
          />
          {featured && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-primary-foreground text-xs animate-pulse">
                🔥 FEATURED
              </Badge>
            </div>
          )}
          {!featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
            </div>
          )}
          <div className="absolute top-3 right-3 flex flex-col gap-1">
            {inStock ? (
              <>
                <Badge className="bg-success/20 text-success border-success/30 text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  In Stock
                </Badge>
                {stock && (
                  <Badge variant="outline" className="text-xs bg-warning/20 text-warning border-warning/30">
                    {stock} left
                  </Badge>
                )}
              </>
            ) : (
              <Badge variant="destructive" className="text-xs">
                Out of Stock
              </Badge>
            )}
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3 w-3 ${i < rating ? 'text-warning fill-warning' : 'text-muted'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">({rating}.0)</span>
          </div>
          
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="text-2xl font-bold text-primary">${price}</div>
                  {originalPrice && (
                    <div className="text-sm text-muted-foreground line-through">${originalPrice}</div>
                  )}
                </div>
                {profitPotential && (
                  <div className="text-xs text-warning font-medium">
                    💰 Potential: {profitPotential}
                  </div>
                )}
              </div>
              <div className="flex items-center text-xs text-success">
                <Shield className="h-3 w-3 mr-1" />
                Anonymous
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300" 
            disabled={!inStock}
          >
            {inStock ? 'View Details' : 'Notify When Available'}
          </Button>
        </CardFooter>
      </Card>
    </ProductModal>
  );
};

export default ProductCard;