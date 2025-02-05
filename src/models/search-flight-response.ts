export interface SearchFlightResponse {
  context: Context;
  itineraries: Itinerary[];
  messages: string[];
  filterStats: FilterStats;
  flightsSessionId: string;
  destinationImageUrl: string;
}

export interface Context {
  status: 'incomplete' | 'complete';
  sessionId: string;
  totalResults: number;
}

export interface Itinerary {
  id: string;
  price: Price;
  legs: Leg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: FarePolicy;
  eco?: Eco;
  fareAttributes: FareAttributes;
  tags?: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
}

export interface Price {
  raw: number;
  formatted: string;
  pricingOptionId: string;
}

export interface Leg {
  id: string;
  origin: Location;
  destination: Location;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: Carriers;
  segments: Segment[];
}

export interface Location {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted: boolean;
}

export interface Carriers {
  marketing: Marketing[];
  operationType: string;
  operating?: Operating[];
}

export interface Marketing {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
}

export interface Operating {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
}

export interface Segment {
  id: string;
  origin: SegmentLocation;
  destination: SegmentLocation;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: MarketingCarrier;
  operatingCarrier: OperatingCarrier;
}

export interface SegmentLocation {
  flightPlaceId: string;
  displayCode: string;
  parent?: SegmentLocation;
  name: string;
  type: string;
  country?: string;
}
export interface MarketingCarrier {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
  displayCode: string;
}

export interface OperatingCarrier {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
  displayCode: string;
}

export interface FarePolicy {
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
  isPartiallyRefundable: boolean;
}

export interface Eco {
  ecoContenderDelta: number;
}

export interface FareAttributes {}

export interface FilterStats {
  duration: Duration;
  airports: Airport[];
  carriers: Carrier[];
  stopPrices: StopPrices;
}

export interface Duration {
  min: number;
  max: number;
  multiCityMin: number;
  multiCityMax: number;
}

export interface Airport {
  city: string;
  airports: AirportInfo[];
}

export interface AirportInfo {
  id: string;
  entityId: string;
  name: string;
}

export interface Carrier {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
}

export interface StopPrices {
  direct: Direct;
  one: One;
  twoOrMore: TwoOrMore;
}

export interface Direct {
  isPresent: boolean;
  formattedPrice: string;
}

export interface One {
  isPresent: boolean;
  formattedPrice: string;
}

export interface TwoOrMore {
  isPresent: boolean;
}
