import { useState, useEffect } from 'react';

interface BitcoinPriceData {
  price: number;
  loading: boolean;
  error: string | null;
}

export const useBitcoinPrice = (): BitcoinPriceData => {
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        setPrice(data.bitcoin.usd);
        setError(null);
      } catch (err) {
        setError('Failed to fetch Bitcoin price');
        // Fallback price if API fails
        setPrice(45000);
      } finally {
        setLoading(false);
      }
    };

    fetchBitcoinPrice();
    
    // Update price every 30 seconds
    const interval = setInterval(fetchBitcoinPrice, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { price, loading, error };
};