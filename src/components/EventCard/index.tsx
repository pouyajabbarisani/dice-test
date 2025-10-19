import React, { useState } from 'react';
import { Event } from '../../types';
import { formatLocation } from '../../utils';

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
      
      <div className="!mt-5 p-1" style={{ backgroundColor: '#F2F2F2' }}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left px-2 py-0 text-md hover:opacity-80 transition-colors flex justify-between items-center font-bold"
          style={{ backgroundColor: '#F2F2F2' }}
        >
          <span>More info</span>
          <span className="text-2xl font-light">{isExpanded ? '-' : '+'}</span>
        </button>
        
        {isExpanded && event.description && (
          <div className="px-3 pb-2 pt-2 text-md leading-[126%] font-medium" style={{ backgroundColor: '#F2F2F2' }}>
            {event.description}
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <button 
          className={`px-4 py-3 font-bold text-center transition-colors ${
            event.soldOut 
              ? 'bg-gray-300 text-black cursor-not-allowed' 
              : 'text-white hover:opacity-80'
          }`}
          style={{
            fontSize: '14px',
            fontWeight: 600,
            lineHeight: '100%',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            ...(!event.soldOut && { backgroundColor: '#3C74FF' })
          }}
          disabled={event.soldOut}
        >
          {event.soldOut ? 'SOLD OUT' : 'GET REMINDED'}
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
