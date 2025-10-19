import React from 'react';

interface FeaturedIndicatorProps {
  featured?: boolean;
  className?: string;
}

export const FeaturedIndicator: React.FC<FeaturedIndicatorProps> = ({ 
  featured, 
  className = "" 
}) => {
  // Only show if featured is true
  if (!featured) {
    return null;
  }

  return (
    <div className={`absolute right-4 text-white px-2 py-1 text-sm font-medium ${className}`}
         style={{ backgroundColor: '#3C74FF', letterSpacing: '1px', fontWeight: 700 }}>
      FEATURED
    </div>
  );
};
