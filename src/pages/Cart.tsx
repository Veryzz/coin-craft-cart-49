import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Minus, Plus, Trash2, ShoppingCart, Bitcoin, Shield, Coins, CreditCard, Copy, CheckCircle, Clock, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, getItemCount, clearCart } = useCart();
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const [showAnimation, setShowAnimation] = useState(false);

  // Payment addresses
  const addresses = {
    BTC: "3A7hspBra1rF2qmsDEsZGB9fGUi7rtWC32",
    ETH: "0xb32851b1879f5e50c3a96bF82fD08D19a56C7Bd1",
    USDT: "0xb32851b1879f5e50c3a96bF82fD08D19a56C7Bd1"
  };

  // Mock crypto prices
  const cryptoPrices = {
    BTC: 45000,
    ETH: 2800,
    USDT: 1
  };

  const getCryptoAmount = (crypto: keyof typeof cryptoPrices) => {
    return (getTotalPrice() / cryptoPrices[crypto]).toFixed(crypto === 'USDT' ? 2 : 8);
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
      toast.success(`Order confirmed! Payment method: ${paymentMethod}. You will receive your products at ${email} once payment is verified.`);
      setShowAnimation(false);
      clearCart();
    }, 3000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">
              Explore our premium digital goods and start building your collection.
            </p>
            <Button asChild className="bg-gradient-primary">
              <Link to="/">Browse Products</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (showAnimation) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16">
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
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            Shopping Cart <span className="text-primary">({getItemCount()} items)</span>
          </h1>
          <Button variant="outline" onClick={clearCart} className="text-destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="text-xl font-bold text-primary">
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-4">
                  <span>Total:</span>
                  <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Secure Checkout
                </CardTitle>
              </CardHeader>
              <CardContent>
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
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Clock className="h-4 w-4 text-primary" />
                          <Badge variant="destructive" className="font-mono">
                            {formatTime(timeLeft)}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Amount:</span>
                          <div className="text-right">
                            <div className="font-semibold text-warning">
                              {getCryptoAmount('BTC')} BTC
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ${getTotalPrice().toFixed(2)} USD
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Send BTC to:</Label>
                        <div className="relative">
                          <div className="p-3 bg-black/20 rounded-lg border font-mono text-sm break-all">
                            {addresses.BTC}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-1 right-1"
                            onClick={() => copyToClipboard(addresses.BTC, "BTC address")}
                          >
                            {copied ? (
                              <CheckCircle className="h-4 w-4 text-success" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email-btc">Your Email (for delivery):</Label>
                        <Input
                          id="email-btc"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full"
                          required
                        />
                      </div>

                      <div className="text-xs text-muted-foreground space-y-1 bg-black/20 p-3 rounded-lg">
                        <p>• Send EXACT amount to avoid delays</p>
                        <p>• Network fees NOT included</p>
                        <p>• Delivery within 5 minutes after confirmation</p>
                      </div>

                      <Button
                        className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                        onClick={() => handlePaymentConfirm('BTC')}
                        disabled={!email}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        I SENT THE PAYMENT
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="ETH" className="mt-4">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Clock className="h-4 w-4 text-primary" />
                          <Badge variant="destructive" className="font-mono">
                            {formatTime(timeLeft)}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Amount:</span>
                          <div className="text-right">
                            <div className="font-semibold text-blue-400">
                              {getCryptoAmount('ETH')} ETH
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ${getTotalPrice().toFixed(2)} USD
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Send ETH to:</Label>
                        <div className="relative">
                          <div className="p-3 bg-black/20 rounded-lg border font-mono text-sm break-all">
                            {addresses.ETH}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-1 right-1"
                            onClick={() => copyToClipboard(addresses.ETH, "ETH address")}
                          >
                            {copied ? (
                              <CheckCircle className="h-4 w-4 text-success" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email-eth">Your Email (for delivery):</Label>
                        <Input
                          id="email-eth"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full"
                          required
                        />
                      </div>

                      <div className="text-xs text-muted-foreground space-y-1 bg-black/20 p-3 rounded-lg">
                        <p>• Send EXACT amount to avoid delays</p>
                        <p>• Network fees NOT included</p>
                        <p>• Delivery within 5 minutes after confirmation</p>
                      </div>

                      <Button
                        className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                        onClick={() => handlePaymentConfirm('ETH')}
                        disabled={!email}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        I SENT THE PAYMENT
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="USDT" className="mt-4">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Clock className="h-4 w-4 text-primary" />
                          <Badge variant="destructive" className="font-mono">
                            {formatTime(timeLeft)}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Amount:</span>
                          <div className="text-right">
                            <div className="font-semibold text-green-400">
                              {getCryptoAmount('USDT')} USDT
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ${getTotalPrice().toFixed(2)} USD
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Send USDT to:</Label>
                        <div className="relative">
                          <div className="p-3 bg-black/20 rounded-lg border font-mono text-sm break-all">
                            {addresses.USDT}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-1 right-1"
                            onClick={() => copyToClipboard(addresses.USDT, "USDT address")}
                          >
                            {copied ? (
                              <CheckCircle className="h-4 w-4 text-success" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email-usdt">Your Email (for delivery):</Label>
                        <Input
                          id="email-usdt"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full"
                          required
                        />
                      </div>

                      <div className="text-xs text-muted-foreground space-y-1 bg-black/20 p-3 rounded-lg">
                        <p>• Send EXACT amount to avoid delays</p>
                        <p>• Network fees NOT included</p>
                        <p>• Delivery within 5 minutes after confirmation</p>
                      </div>

                      <Button
                        className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                        onClick={() => handlePaymentConfirm('USDT')}
                        disabled={!email}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        I SENT THE PAYMENT
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="PAYPAL" className="mt-4">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <Clock className="h-4 w-4 text-primary" />
                          <Badge variant="destructive" className="font-mono">
                            {formatTime(timeLeft)}
                          </Badge>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-muted-foreground">Amount:</span>
                          <div className="text-right">
                            <div className="font-semibold text-blue-500">${getTotalPrice().toFixed(2)} USD</div>
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

                      <div className="space-y-2">
                        <Label htmlFor="email-paypal">Your Email (for delivery):</Label>
                        <Input
                          id="email-paypal"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full"
                          required
                        />
                      </div>

                      <div className="text-xs text-muted-foreground space-y-1 bg-black/20 p-3 rounded-lg">
                        <p>• Send EXACT amount as Friends & Family</p>
                        <p>• Include your order email in PayPal note</p>
                        <p>• Delivery within 5 minutes after confirmation</p>
                      </div>

                      <Button
                        className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                        onClick={() => handlePaymentConfirm('PayPal')}
                        disabled={!email}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        I SENT THE PAYMENT
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;