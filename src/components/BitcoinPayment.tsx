import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bitcoin, Copy, Clock, CheckCircle } from "lucide-react";
import { useBitcoinPrice } from "@/hooks/useBitcoinPrice";
import { toast } from "sonner";

interface BitcoinPaymentProps {
  usdAmount: number;
  onPaymentConfirm: () => void;
}

const BitcoinPayment = ({ usdAmount, onPaymentConfirm }: BitcoinPaymentProps) => {
  const { price: bitcoinPrice, loading } = useBitcoinPrice();
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60); // 24 hours in seconds
  const [copied, setCopied] = useState(false);
  
  const bitcoinAddress = "3A7hspBra1rF2qmsDEsZGB9fGUi7rtWC32";
  const bitcoinAmount = loading ? 0 : (usdAmount / bitcoinPrice);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-card rounded-lg border border-border">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Bitcoin className="h-6 w-6 text-warning" />
          <h3 className="text-xl font-semibold">Bitcoin Payment</h3>
        </div>
        
        {/* Timer */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">Payment expires in:</span>
          <Badge variant="destructive" className="font-mono">
            {formatTime(timeLeft)}
          </Badge>
        </div>
      </div>

      {/* Payment Details */}
      <div className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-lg border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Amount to Pay:</span>
            <div className="text-right">
              <div className="font-semibold text-warning">
                {loading ? '...' : bitcoinAmount.toFixed(8)} BTC
              </div>
              <div className="text-xs text-muted-foreground">
                ${usdAmount.toFixed(2)} USD
              </div>
            </div>
          </div>
          
          {!loading && (
            <div className="text-xs text-muted-foreground text-center mt-2">
              BTC Price: ${bitcoinPrice.toLocaleString()}
            </div>
          )}
        </div>

        {/* Bitcoin Address */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Send Bitcoin to this address:</label>
          <div className="relative">
            <div className="p-3 bg-black/20 rounded-lg border font-mono text-sm break-all">
              {bitcoinAddress}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-1 right-1"
              onClick={() => copyToClipboard(bitcoinAddress, 'Bitcoin address')}
            >
              {copied ? <CheckCircle className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Amount to Copy */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Exact amount to send:</label>
          <div className="relative">
            <div className="p-3 bg-black/20 rounded-lg border font-mono text-sm">
              {loading ? 'Loading...' : `${bitcoinAmount.toFixed(8)} BTC`}
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-1 right-1"
              onClick={() => copyToClipboard(bitcoinAmount.toFixed(8), 'Bitcoin amount')}
              disabled={loading}
            >
              {copied ? <CheckCircle className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>• Send the exact amount to avoid delays</p>
        <p>• Network fee is not included in the amount above</p>
        <p>• Transaction will be confirmed automatically</p>
        <p>• Contact support if you have any issues</p>
      </div>

      <Button 
        className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
        onClick={onPaymentConfirm}
      >
        I've Sent the Payment
      </Button>
    </div>
  );
};

export default BitcoinPayment;