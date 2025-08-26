import MobileOptimizedGrid from "./MobileOptimizedGrid";
import ProductCard from "./ProductCard";
import applePay from "@/assets/reaper-apple-pay.jpg";
import paypal from "@/assets/reaper-paypal.jpg"; 
import amazon from "@/assets/reaper-amazon-store.jpg";
import cloned from "@/assets/reaper-cloned-cards.jpg";
import banking from "@/assets/reaper-uhq-dumps.jpg";
import cryptoWallet from "@/assets/reaper-crypto-wallet.jpg";

const ProductGrid = () => {
  const products = [
    {
      id: "apple-pay-cc",
      title: "APPLE PAY CC | LINKABLE",
      description: "Card that easily links to Apple PAY (500-900) Method Included!",
      price: "29.99",
      image: applePay,
      rating: 5,
      inStock: true,
      stock: 8,
      category: "Digital Cards"
    },
    {
      id: "paypal-logins",
      title: "PAYPAL LOGINS BALANCED | FULL ACCESS",
      description: "PayPal Login + Random Balance + CC and BANK (Method included)",
      price: "25.00",
      image: paypal,
      rating: 5,
      inStock: true,
      stock: 12,
      category: "Account Access"
    },
    {
      id: "stolen-crypto-logins",
      title: "STOLEN CRYPTO LOGINS",
      description: "Stolen crypto wallet files with malware, random balance unchecked.",
      price: "39.99",
      image: cryptoWallet,
      rating: 5,
      inStock: true,
      stock: 6,
      category: "Crypto Access"
    },
    {
      id: "amazon-store-card",
      title: "AMAZON STORE CARD | 1000$+",
      description: "PREPAID AMAZON CARD THAT EASILY LINKS AND PURCHASES! (method included)",
      price: "20.99",
      image: amazon,
      rating: 5,
      inStock: false,
      stock: 0,
      category: "Gift Cards"
    },
    {
      id: "amazon-aged-account",
      title: "AMAZON AGED ACCOUNT | 4-6 Years+",
      description: "Aged Amazon Account to successfully use amazon cards. (method included)",
      price: "24.99",
      image: amazon,
      rating: 5,
      inStock: true,
      stock: 4,
      category: "Account Access"
    },
    {
      id: "cloned-cards-physical",
      title: "CLONED CARDS (PHYSICALS)",
      description: "Cloned Physicals for real life usage. (Balanced)",
      price: "68.99",
      image: cloned,
      rating: 5,
      inStock: true,
      stock: 3,
      category: "Physical Cards"
    }
  ];

  return (
    <MobileOptimizedGrid className="bg-secondary/20" id="products">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </MobileOptimizedGrid>
  );
};

export default ProductGrid;