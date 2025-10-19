import { formatLocation, getCountryCode } from './location';

describe('location utilities', () => {
  describe('formatLocation', () => {
    test('handles null/undefined input', () => {
      expect(formatLocation(null)).toBeNull();
      expect(formatLocation(undefined)).toBeNull();
    });

    test('formats object with city and country', () => {
      const location = {
        city: 'London',
        country: 'United Kingdom'
      };
      expect(formatLocation(location)).toBe('London, UK');
    });

    test('formats object with city, state, and country', () => {
      const location = {
        city: 'New York',
        state: 'NY',
        country: 'United States'
      };
      expect(formatLocation(location)).toBe('New York, NY, US');
    });

    test('handles missing city', () => {
      const location = {
        country: 'United Kingdom'
      };
      expect(formatLocation(location)).toBe('UK');
    });

    test('handles unknown country', () => {
      const location = {
        city: 'Paris',
        country: 'Unknown Country'
      };
      expect(formatLocation(location)).toBe('Paris');
    });

    test('handles empty object', () => {
      expect(formatLocation({})).toBeNull();
    });
  });

  describe('getCountryCode', () => {
    test('returns correct country codes', () => {
      expect(getCountryCode('United Kingdom')).toBe('UK');
      expect(getCountryCode('United States')).toBe('US');
      expect(getCountryCode('Germany')).toBe('DE');
      expect(getCountryCode('France')).toBe('FR');
    });

    test('returns null for unknown countries', () => {
      expect(getCountryCode('Unknown Country')).toBeNull();
      expect(getCountryCode('')).toBeNull();
    });
  });
});
