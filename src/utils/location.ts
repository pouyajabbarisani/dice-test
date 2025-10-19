export const getCountryCode = (countryName: string): string | null => {
  const countryMap: { [key: string]: string } = {
    'United Kingdom': 'UK',
    'United States': 'US',
    'Germany': 'DE',
    'France': 'FR',
    'Italy': 'IT',
    'Spain': 'ES',
    'Netherlands': 'NL',
    'Belgium': 'BE',
    'Switzerland': 'CH',
    'Austria': 'AT',
    'Canada': 'CA',
    'Australia': 'AU',
    'Japan': 'JP',
    'South Korea': 'KR',
    'China': 'CN',
    'India': 'IN',
    'Brazil': 'BR',
    'Mexico': 'MX',
    'Argentina': 'AR',
    'Russia': 'RU',
    'Poland': 'PL',
    'Czech Republic': 'CZ',
    'Hungary': 'HU',
    'Portugal': 'PT',
    'Greece': 'GR',
    'Turkey': 'TR',
    'Sweden': 'SE',
    'Norway': 'NO',
    'Denmark': 'DK',
    'Finland': 'FI',
    'Ireland': 'IE',
    'Iceland': 'IS'
  };
  
  return countryMap[countryName] || null;
};

export const formatLocation = (location: any): string | null => {
  if (!location) return null;
  
  // If it's already a string, return it
  if (typeof location === 'string') return location;
  
  // If it's an object, format it properly
  if (typeof location === 'object') {
    const parts = [];
    
    if (location.city) parts.push(location.city);
    if (location.state) parts.push(location.state);
    
    // Convert country to 2-letter code
    if (location.country) {
      const countryCode = getCountryCode(location.country);
      if (countryCode) parts.push(countryCode);
    }
    
    return parts.join(', ') || null;
  }
  
  return null;
};
