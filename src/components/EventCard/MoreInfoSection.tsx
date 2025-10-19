import React from 'react';
import { Event } from '../../types';

interface MoreInfoSectionProps {
  event: Event;
  isExpanded: boolean;
  onToggle: () => void;
}

export const MoreInfoSection: React.FC<MoreInfoSectionProps> = ({
  event,
  isExpanded,
  onToggle
}) => {
  return (
    <div className="!mt-5 p-1" style={{ backgroundColor: '#F2F2F2' }}>
      <button
        onClick={onToggle}
        className="w-full text-left px-2 py-0 text-md hover:opacity-80 transition-colors flex justify-between items-center font-bold"
        style={{ backgroundColor: '#F2F2F2' }}
      >
        <span>More info</span>
        <span className="text-2xl font-light">{isExpanded ? '-' : '+'}</span>
      </button>
      
      {isExpanded && (
        <div className="px-3 pb-2 pt-2 text-md leading-[126%] font-medium space-y-4" style={{ backgroundColor: '#F2F2F2' }}>
          {event.description && (
            <div>{event.description}</div>
          )}
          
          {/* LINE UP */}
          {event.lineup && event.lineup.length > 0 && (
            <div>
              <h4 className="text-sm font-bold mb-3 mt-5" style={{ color: '#3C74FF' }}>LINE UP</h4>
              <div className="space-y-1">
                {event.lineup.map((item, index) => (
                  <div key={index} className="text-sm flex items-center gap-2">
                    <span>{item.details}{item.time ? ' - ' : ''}</span>
                    {item.time && (
                      <span className="font-bold">{item.time}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* TICKETS */}
          {event.ticket_types && event.ticket_types.length > 0 && (
            <div>
              <h4 className="text-sm font-bold mb-3 mt-5" style={{ color: '#3C74FF' }}>TICKETS</h4>
              <div className="space-y-1">
                {event.ticket_types.map((ticket, index) => (
                  <div key={index} className="text-sm flex items-center gap-2">
                    <span>{ticket.name} - </span>
                    <span className="font-bold">
                      £{(ticket.price.face_value / 100).toFixed(0)}
                    </span>
                    {ticket.sold_out && (
                      <span className="text-gray-500 text-xs font-bold" style={{ letterSpacing: '1px' }}>SOLD OUT</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
