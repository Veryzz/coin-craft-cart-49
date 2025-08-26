import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Zap, CreditCard, Copy } from "lucide-react";

interface PayPalPaymentContentProps {
  usdAmount: number;
  timeLeft: number;
  formatTime: (seconds: number) => string;
  copyToClipboard: (text: string, label: string) => void;
  copied: boolean;
  email: string;
  setEmail: (val: string) => void;
  handlePaymentConfirm: (paymentMethod: string) => void;
}

const PayPalPaymentContent: React.FC<PayPalPaymentContentProps> = ({
  usdAmount,
  timeLeft,
  formatTime,
  copyToClipboard,
  copied,
  email,
  setEmail,
  handlePaymentConfirm,
}) => {
  return (
    <div className="space-y-6 p-6 bg-gradient-card rounded-lg border border-border">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <CreditCard className="h-6 w-6 text-blue-500" />
          <h3 className="text-xl font-semibold">PayPal Payment</h3>
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-primary" />
          <Badge variant="destructive" className="font-mono">
            {formatTime(timeLeft)}
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-lg border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Amount:</span>
            <div className="text-right">
              <div className="font-semibold text-blue-500">${usdAmount.toFixed(2)} USD</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Send PayPal payment to:</Label>
          <div className="relative">
            <div className="p-3 bg-black/20 rounded-lg border font-mono text-sm break-all">
              jibiop45@gmail.com
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-1 right-1"
              onClick={() => copyToClipboard("jibiop45@gmail.com", "PayPal email")}
            >
              {copied ? (
                <CheckCircle className="h-4 w-4 text-success" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="bg-warning/20 p-3 rounded-lg border border-warning/30">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-warning" />
            <span className="font-semibold text-warning">IMPORTANT</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Send payment as <strong>"Friends & Family"</strong> only. Regular payments will be refunded!
          </p>
        </div>

        <div className="space-y-2 relative z-10">
          <Label htmlFor="email-paypal" className="block text-sm font-medium">
            Your Email (for delivery):
          </Label>
          <Input
            id="email-paypal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full bg-background/90 border-2 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none relative z-20"
            required
            autoComplete="email"
            style={{ pointerEvents: "auto", position: "relative" }}
          />
        </div>

        <div className="text-xs text-muted-foreground space-y-1 bg-black/20 p-3 rounded-lg">
          <p>• Send EXACT amount as Friends & Family</p>
          <p>• Include your order email in PayPal note</p>
          <p>• Delivery within 5 minutes after confirmation</p>
        </div>

        <Button
          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          onClick={() => handlePaymentConfirm("PayPal")}
          disabled={!email}
        >
          <Zap className="h-4 w-4 mr-2" />
          I SENT THE PAYMENT
        </Button>
      </div>
    </div>
  );
};

export default PayPalPaymentContent;
