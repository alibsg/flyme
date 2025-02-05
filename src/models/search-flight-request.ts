export interface SearchFlightRequest {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string; // Departure or travel date. Format: YYYY-MM-DD
  returnDate?: string; // Return date. Format: YYYY-MM-DD
  cabinClass?: 'economy' | 'premium_economy' | 'business' | 'first';
  adults?: string;
  childrens?: string;
  infants?: string;
  sortBy?:
    | 'best'
    | 'price_high'
    | 'fastest'
    | 'outbound_take_off_time'
    | 'outbound_landing_time'
    | 'return_take_off_time'
    | 'return_landing_time';
  limit?: string;
  currency?: string;
  market?: string;
  countryCode?: string;
}
