import React, { useState } from 'react';
import { Event } from '../../types';
import { formatLocation } from '../../utils';
import { PlayButton } from './PlayButton';
import { SaleIndicator } from './SaleIndicator';
import { FeaturedIndicator } from './FeaturedIndicator';
import { MoreInfoSection } from './MoreInfoSection';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
      const day = date.getDate();
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const time = date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }).toLowerCase();
      
      return `${dayOfWeek} ${day} ${month} - ${time}`;
    } catch {
      return dateString;
    }
  };



  const formatImgixUrl = (imageUrl: string | undefined, width: number = 400, height: number = 400) => {
    if (!imageUrl) return null;
    
    const hasParams = imageUrl.includes('?');
    const separator = hasParams ? '&' : '?';
    
    const imgixParams = [
      `w=${width}`,
      `h=${height}`,
      'fit=crop',
      'auto=format',
      'auto=compress',
      'q=75'
    ].join('&');
    
    return `${imageUrl}${separator}${imgixParams}`;
  };

  const isSaleActive = () => {
    if (!event.sale_end_date) return false;
    const saleEndDate = new Date(event.sale_end_date);
    const now = new Date();
    return saleEndDate > now; // Sale is still active (end date is in the future)
  };

  return (
    <div className="flex flex-col space-y-3">

        {formatImgixUrl(event.image) && (
        <div className="w-full aspect-square overflow-hidden relative">
          <img 
            src={formatImgixUrl(event.image, 400, 400)!}
            srcSet={`
              ${formatImgixUrl(event.image, 300, 300)} 300w,
              ${formatImgixUrl(event.image, 400, 400)} 400w,
              ${formatImgixUrl(event.image, 600, 600)} 600w
            `}
            sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 600px"
            alt={event.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          
          <PlayButton 
            apple_music_tracks={event.apple_music_tracks}
            spotify_tracks={event.spotify_tracks}
          />
          
          <FeaturedIndicator 
            featured={event.featured}
            className={isSaleActive() ? 'bottom-12' : 'bottom-4'}
          />
          
          <SaleIndicator 
            status={event.status}
            sale_start_date={event.sale_start_date}
            sale_end_date={event.sale_end_date}
          />
        </div>
      )}
      
      <div className="text-sm font-normal">
        {formatDate(event.date)}
      </div>
      
      <h3 className="text-[1.75rem] !mt-2 font-bold leading-[110%]">
        {event.name}
      </h3>
      
      <div className="text-md font-bold">
        {event.venue.name}
      </div>
      
        {formatLocation(event.venue.location) && (
          <div className="text-md !mt-0 leading-[75%]">
            {formatLocation(event.venue.location)}
          </div>
        )}
      
      <MoreInfoSection 
        event={event}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />
      
      <div className="flex justify-between items-center mt-4">
        <button 
          className={`px-4 py-3 font-bold text-center transition-colors ${
            event.sold_out
              ? 'bg-gray-300 text-black cursor-not-allowed' 
              : 'text-white hover:opacity-80'
          }`}
          style={{
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '100%',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            ...(!event.sold_out && { backgroundColor: '#3C74FF' })
          }}
          disabled={event.sold_out}
        >
          {event.sold_out ? 'SOLD OUT' : 'GET REMINDED'}
        </button>
        
        {event.price && (
          <div className="text-3xl font-normal text-gray-900">
            {event.price}
          </div>
        )}
      </div>
    </div>
  );
};
