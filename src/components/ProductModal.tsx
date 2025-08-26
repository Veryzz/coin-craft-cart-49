import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Clock, Zap } from "lucide-react";
import { toast } from "sonner";
import PaymentTabs from "./PaymentTabs";

interface ProductModalProps {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  inStock: boolean;
  stock?: number;
  category: string;
  children: React.ReactNode;
}

const ProductModal = ({ 
  id, title, description, price, image, rating, inStock, stock, category, children 
}: ProductModalProps) => {
  
  const handlePaymentConfirm = (email: string, crypto: string) => {
    toast.success(`🔍 We're monitoring the blockchain for your payment. Once confirmed, ${title} will be instantly delivered to ${email}. No payment detected yet.`);
  };

  const features = [
    "🚀 Instant delivery (2-5 minutes)",
    "🔐 100% anonymous & secure",
    "💰 Crypto payments only", 
    "🎯 Fresh & working guaranteed",
    "📧 Email delivery included"
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="z-[60] bg-background/95 backdrop-blur-md max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={image} 
                alt={title}
                className="w-full h-64 object-contain bg-muted/20"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="secondary">{category}</Badge>
              </div>
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                {inStock ? (
                  <>
                    <Badge className="bg-success/20 text-success border-success/30">
                      <Clock className="h-3 w-3 mr-1" />
                      In Stock
                    </Badge>
                    {stock && (
                      <Badge variant="outline" className="bg-warning/20 text-warning border-warning/30">
                        Only {stock} left!
                      </Badge>
                    )}
                  </>
                ) : (
                  <Badge variant="destructive">
                    Out of Stock
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < rating ? 'text-warning fill-warning' : 'text-muted'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({rating}.0)</span>
              </div>
              
              <div className="text-3xl font-bold text-primary">${price}</div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Product Description</h3>
              <p className="text-muted-foreground leading-relaxed">{description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">What's Included</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-success" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-black/20 p-4 rounded-lg border border-primary/30">
              <h3 className="text-lg font-semibold mb-3 text-primary">🔥 CRYPTO ONLY</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 bg-gradient-card rounded border">
                  <div className="text-warning text-lg">₿</div>
                  <div className="text-xs">Bitcoin</div>
                </div>
                <div className="text-center p-2 bg-gradient-card rounded border">
                  <div className="text-blue-400 text-lg">Ξ</div>
                  <div className="text-xs">Ethereum</div>
                </div>
                <div className="text-center p-2 bg-gradient-card rounded border">
                  <div className="text-green-400 text-lg">₮</div>
                  <div className="text-xs">USDT</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/30">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="h-5 w-5 text-primary animate-pulse" />
                  <span className="font-bold text-primary">INSTANT BUY</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  No registration needed • Pay crypto, get product instantly
                </p>
              </div>
              
              <PaymentTabs 
                usdAmount={parseFloat(price)} 
                productTitle={title}
                onPaymentConfirm={handlePaymentConfirm}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;