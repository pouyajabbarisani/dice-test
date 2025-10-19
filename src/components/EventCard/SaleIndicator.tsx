import React from 'react';

interface SaleIndicatorProps {
  status?: string;
  sale_start_date?: string;
  sale_end_date?: string;
  className?: string;
}

export const SaleIndicator: React.FC<SaleIndicatorProps> = ({ 
  status, 
  sale_start_date,
  sale_end_date, 
  className = "" 
}) => {
  const formatSaleDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const time = date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }).toLowerCase();
      
      return `${day} ${month} ${time}`;
    } catch {
      return dateString;
    }
  };

  // Only show if we have a sale end date and it's in the future (sale is active)
  if (!sale_end_date) {
    return null;
  }

  const saleEndDate = new Date(sale_end_date);
  const now = new Date();
  
  // Only show if sale end date is in the future (sale is still active)
  if (saleEndDate <= now) {
    return null;
  }

  return (
    <div className={`absolute bottom-4 right-4 bg-black text-white px-2 py-1 text-sm font-bold  ${className}`}>
      On sale {sale_start_date ? formatSaleDate(sale_start_date) : ''}
    </div>
  );
};
