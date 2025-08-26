import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bitcoin, Coins } from "lucide-react";

const CryptoPayments = () => {
  const cryptos = [
    { name: "Bitcoin", symbol: "BTC", color: "text-crypto-gold" },
    { name: "Ethereum", symbol: "ETH", color: "text-crypto-blue" },
    { name: "USDT", symbol: "USDT", color: "text-success" },
    { name: "Litecoin", symbol: "LTC", color: "text-muted-foreground" },
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Secure <span className="bg-gradient-crypto bg-clip-text text-transparent">Crypto</span> Payments
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We accept all major cryptocurrencies for secure, anonymous, and instant transactions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Card className="p-8 bg-gradient-card border-border/50">
              <div className="flex items-center mb-6">
                <Bitcoin className="h-8 w-8 text-crypto-gold mr-3" />
                <div>
                  <h3 className="text-xl font-semibold">Why Crypto Only?</h3>
                  <p className="text-sm text-muted-foreground">Maximum security and privacy</p>
                </div>
              </div>
              
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <span className="text-sm">Complete transaction anonymity</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <span className="text-sm">Instant global payments</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <span className="text-sm">No chargebacks or disputes</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                  <span className="text-sm">Lower transaction fees</span>
                </li>
              </ul>
            </Card>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Accepted Cryptocurrencies</h3>
            <div className="grid grid-cols-2 gap-4">
              {cryptos.map((crypto) => (
                <Card key={crypto.symbol} className="p-4 bg-gradient-card border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center">
                    <Coins className={`h-6 w-6 mr-3 ${crypto.color}`} />
                    <div>
                      <div className="font-semibold">{crypto.name}</div>
                      <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-6">
              <Badge className="bg-primary/20 text-primary border-primary/30">
                <Coins className="h-3 w-3 mr-1" />
                More cryptocurrencies added regularly
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoPayments;