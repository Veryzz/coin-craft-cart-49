import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bitcoin, Coins, Copy, CheckCircle, Clock, Zap, CreditCard } from "lucide-react";
import { useBitcoinPrice } from "@/hooks/useBitcoinPrice";
import { toast } from "sonner";
import CryptoPaymentContent from "@/components/payments/CryptoPaymentContent";
import PayPalPaymentContent from "@/components/payments/PayPalPaymentContent";

interface PaymentTabsProps {
  usdAmount: number;
  productTitle: string;
  onPaymentConfirm: (email: string, paymentMethod: string) => void;
}

const PaymentTabs = ({ usdAmount, productTitle, onPaymentConfirm }: PaymentTabsProps) => {
  console.log('PaymentTabs rendered with:', { usdAmount, productTitle });
  
  const { price: bitcoinPrice, loading } = useBitcoinPrice();
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  
  console.log('Bitcoin price loaded:', { bitcoinPrice, loading });
  
  // Addresses for different cryptos
  const addresses = {
    BTC: "3A7hspBra1rF2qmsDEsZGB9fGUi7rtWC32",
    ETH: "0xb32851b1879f5e50c3a96bF82fD08D19a56C7Bd1",
    USDT: "0xb32851b1879f5e50c3a96bF82fD08D19a56C7Bd1"
  };

  // Mock prices (in real app, fetch from API)
  const cryptoPrices = {
    BTC: bitcoinPrice || 45000,
    ETH: 2800,
    USDT: 1
  };

  const getCryptoAmount = (crypto: keyof typeof cryptoPrices) => {
    return (usdAmount / cryptoPrices[crypto]).toFixed(crypto === 'USDT' ? 2 : 8);
  };

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
    toast.success(`${label} copied!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentConfirm = (paymentMethod: string) => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setShowAnimation(true);
    setTimeout(() => {
      onPaymentConfirm(email, paymentMethod);
      setShowAnimation(false);
    }, 3000);
  };



  if (showAnimation) {
    return (
      <div className="text-center p-12 space-y-6">
        <div className="animate-bounce text-6xl">
          🚀
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-success animate-pulse">
            Payment Verification in Progress!
          </h3>
          <p className="text-muted-foreground">
            Your order will be automatically delivered once payment is confirmed on the blockchain.
          </p>
          <div className="flex items-center justify-center gap-2 text-success">
            <CheckCircle className="h-5 w-5 animate-pulse" />
            <span>Monitoring blockchain for your transaction...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="BTC" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="BTC" className="flex items-center gap-2">
          <Bitcoin className="h-4 w-4" />
          Bitcoin
        </TabsTrigger>
        <TabsTrigger value="ETH" className="flex items-center gap-2">
          <Coins className="h-4 w-4" />
          Ethereum
        </TabsTrigger>
        <TabsTrigger value="USDT" className="flex items-center gap-2">
          <Coins className="h-4 w-4" />
          USDT
        </TabsTrigger>
        <TabsTrigger value="PAYPAL" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          PayPal
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="BTC" className="mt-4">
        <CryptoPaymentContent
          crypto="BTC"
          icon={Bitcoin}
          color="text-warning"
          address={addresses.BTC}
          usdAmount={usdAmount}
          timeLeft={timeLeft}
          formatTime={formatTime}
          getCryptoAmount={getCryptoAmount}
          copyToClipboard={copyToClipboard}
          copied={copied}
          email={email}
          setEmail={setEmail}
          handlePaymentConfirm={handlePaymentConfirm}
        />
      </TabsContent>

      <TabsContent value="ETH" className="mt-4">
        <CryptoPaymentContent
          crypto="ETH"
          icon={Coins}
          color="text-blue-400"
          address={addresses.ETH}
          usdAmount={usdAmount}
          timeLeft={timeLeft}
          formatTime={formatTime}
          getCryptoAmount={getCryptoAmount}
          copyToClipboard={copyToClipboard}
          copied={copied}
          email={email}
          setEmail={setEmail}
          handlePaymentConfirm={handlePaymentConfirm}
        />
      </TabsContent>

      <TabsContent value="USDT" className="mt-4">
        <CryptoPaymentContent
          crypto="USDT"
          icon={Coins}
          color="text-green-400"
          address={addresses.USDT}
          usdAmount={usdAmount}
          timeLeft={timeLeft}
          formatTime={formatTime}
          getCryptoAmount={getCryptoAmount}
          copyToClipboard={copyToClipboard}
          copied={copied}
          email={email}
          setEmail={setEmail}
          handlePaymentConfirm={handlePaymentConfirm}
        />
      </TabsContent>

      <TabsContent value="PAYPAL" className="mt-4">
        <PayPalPaymentContent
          usdAmount={usdAmount}
          timeLeft={timeLeft}
          formatTime={formatTime}
          copyToClipboard={copyToClipboard}
          copied={copied}
          email={email}
          setEmail={setEmail}
          handlePaymentConfirm={handlePaymentConfirm}
        />
      </TabsContent>
    </Tabs>
  );
};

export default PaymentTabs;