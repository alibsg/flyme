export interface SearchIncompleteRequest {
  sessionId: string;
  limit?: string;
  carriersIds?: string;
  currency?: string;
  market?: string;
  countryCode?: string;
}
