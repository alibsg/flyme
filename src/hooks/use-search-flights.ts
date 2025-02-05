import { useCallback, useState } from 'react';
import { SearchFlightResponse } from '../models/search-flight-response';
import { searchFlights, searchIncomplete } from '../requests/requests';
import { SearchFlightRequest } from '../models/search-flight-request';

export function useSearchFlight() {
  const [flights, setFlights] = useState<SearchFlightResponse | undefined>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startSearch = useCallback(async (searchParams: SearchFlightRequest) => {
    setError(null);
    setPending(true);
    try {
      const data = await searchFlights(searchParams);
      setFlights(data.data);
      if (data.data.context.status === 'incomplete') {
        let iteration = 0;
        let complete = false;
        while(!complete && iteration < 10) {
          const completeData = await searchIncomplete({
            sessionId: data.data.context.sessionId,
            currency: searchParams.currency,
            market: searchParams.market,
            countryCode: searchParams.countryCode,
          });
          if(completeData.data.itineraries.length > 0) {
            setFlights(completeData.data);
          }
          if(completeData.data.context.status === 'complete') {
            complete = true;
          }
          iteration++;
        }
      }
    } catch (e) {
      console.log(e);
      setError('Error searching flights');
    } finally {
      setPending(false);
    }
  }, []);

  return { flights, startSearch, error, pending };
}
