import { ReactNode } from 'react';

interface MobileOptimizedLayoutProps {
  children: ReactNode;
}

const MobileOptimizedLayout = ({ children }: MobileOptimizedLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-first container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default MobileOptimizedLayout;