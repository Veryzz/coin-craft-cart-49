import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Copy, CheckCircle, Percent } from "lucide-react";
import { toast } from "sonner";

const PromoCode = () => {
  const [copied, setCopied] = useState(false);
  const promoCode = "REAP15";

  const copyPromoCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    toast.success("Promo code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-card border border-primary/30 rounded-lg p-4 text-center">
      <div className="space-y-4">
        <Badge className="bg-destructive text-destructive-foreground px-4 py-2 text-sm font-bold">
          ⭕ USE CODE: REAP15 ⭕ 15% OFF
        </Badge>
        
        <div className="flex items-center gap-2 justify-center">
          <Input 
            value={promoCode}
            readOnly
            className="text-center font-mono text-sm font-bold bg-black/20 border-primary max-w-28"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={copyPromoCode}
            className="border-primary hover:bg-primary hover:text-primary-foreground"
          >
            {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Use at checkout for instant savings
        </p>
      </div>
    </div>
  );
};

export default PromoCode;