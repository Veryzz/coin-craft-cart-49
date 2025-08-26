import { ReactNode } from 'react';

interface MobileOptimizedGridProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const MobileOptimizedGrid = ({ children, className = "", id }: MobileOptimizedGridProps) => {
  return (
    <section className={`py-12 ${className}`} id={id}>
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Premium <span className="bg-gradient-primary bg-clip-text text-transparent">Digital Products</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            High-quality cards and accounts. Instant crypto delivery. Zero logs.
          </p>
          <div className="mt-6">
            <a 
              href="/products" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              View All Products →
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </section>
  );
};

export default MobileOptimizedGrid;