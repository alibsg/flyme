import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from '@mui/material';
import Grid from '@mui/material/Grid2';

import logo from '/logo.webp';
import LocationSearch from '../components/location-search';
import CurrencySelect from '../components/currency-select';
import { AirportResponse } from '../models/airport-response';
import { Config } from '../models/config-response';
import { useSearchFlight } from '../hooks/use-search-flights';
import { SearchFlightRequest } from '../models/search-flight-request';
import FlightListItem from '../components/flight-list-item';
import PassengersSelect, {
  PassengersCount,
} from '../components/passengers-select';
import TripType from '../components/trip-type';
import TripClass, { TripTypes } from '../components/trip-class';

const FlightSearch = () => {
  const [origin, setOrigin] = useState<AirportResponse | null>(null);
  const [destination, setDestination] = useState<AirportResponse | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Config | null>(null);
  const [departureDate, setDepartureDate] = useState<string | undefined>(
    undefined
  );
  const [returnDate, setReturnDate] = useState<string | undefined>(undefined);
  const [passengers, setPassengers] = useState<PassengersCount | undefined>(
    undefined
  );
  const [tripCLass, setTripClass] = useState<TripTypes>('economy');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [error, setError] = useState('');
  const { flights, startSearch, pending } = useSearchFlight();

  const handleSearch = async () => {
    if (!origin || !destination || !departureDate) {
      return;
    }
    const { skyId: originSkyId, entityId: originEntityId } = origin;
    const { skyId: destinationSkyId, entityId: destinationEntityId } =
      destination;

    setError('');

    const searchParams: SearchFlightRequest = {
      originSkyId,
      destinationSkyId,
      originEntityId,
      destinationEntityId,
      date: departureDate,
      returnDate: returnDate,
      cabinClass: tripCLass ?? 'economy',
      adults: passengers?.adults ? passengers?.adults + '' : '1',
      childrens: passengers?.children ? passengers?.children + '' : '0',
      infants: passengers?.infants ? passengers?.infants + '' : '0',
      sortBy: 'best',
      currency: selectedCountry?.currency,
      market: selectedCountry?.market,
      countryCode: selectedCountry?.countryCode,
    };

    startSearch(searchParams);
  };

  return (
    <>
      <Box display="flex" flexDirection="row" justifyContent="center" m={4}>
        <Box
          borderRadius={3}
          overflow="hidden"
          sx={{
            backgroundImage: `url(${logo})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            width: {
              sm: 200,
              md: 100,
            },
            height: {
              sm: 200,
              md: 100,
            },
          }}
        />
      </Box>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid mb={2}>
          <PassengersSelect onChange={setPassengers} />
          <TripType onChange={setIsRoundTrip} />
          <TripClass onChange={setTripClass} />
        </Grid>
        <Grid container columnSpacing={2} rowSpacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <LocationSearch label="Origin" onLocationChange={setOrigin} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <LocationSearch
              label="Destination"
              onLocationChange={setDestination}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Departure Date"
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              fullWidth
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </Grid>
          {isRoundTrip && (
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Return Date"
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
                fullWidth
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </Grid>
          )}
          <Grid size={{ xs: 12, md: 6 }}>
            <CurrencySelect label="Currency" onChange={setSelectedCountry} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSearch}
              disabled={pending}
            >
              {pending ? 'Searching...' : 'Search Flights'}
            </Button>
          </Grid>
        </Grid>
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {flights?.itineraries?.map((flight) => (
            <FlightListItem flight={flight} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default FlightSearch;
