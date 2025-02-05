import { Box, Card, CardContent, Grid2, Typography } from '@mui/material';
import { Itinerary } from '../models/search-flight-response';
import { formatMinutes } from '../utils/utils';

interface FlightListItemProps {
  flight: Itinerary;
}

function FlightListItem({ flight }: FlightListItemProps) {
  const departure = new Date(flight.legs[0].departure);
  const arrival = new Date(flight.legs[flight.legs.length - 1].arrival);
  const days = flight.legs[0].timeDeltaInDays;
  const stopCount = flight.legs[0].stopCount;

  let stopInfo = '';
  if (stopCount > 0 && flight.legs[0].segments.length > 1) {
    if (flight.legs[0].segments.length > 2) {
      for (let i = 1; i < flight.legs[0].segments.length; i++) {
        stopInfo += ', ' + flight.legs[0].segments[i].origin.displayCode;
      }
    } else {
      const arrival = new Date(flight.legs[0].segments[0].arrival);
      const departure = new Date(flight.legs[0].segments[1].departure);
      const strandedMinutes = Math.floor(
        (departure.getTime() - arrival.getTime()) / (1000 * 60)
      );
      stopInfo = formatMinutes(strandedMinutes);
      stopInfo += ' ' + flight.legs[0].segments[1].origin.displayCode;
    }
  }

  return (
    <Grid2 size={12}>
      <Card key={flight.id}>
        <CardContent>
          <Grid2 container spacing={4} alignItems="center">
            <Grid2 display="flex" size={{ sm: 12, md: 6 }}>
              <Box
                sx={{
                  backgroundImage: `url(${flight.legs[0].carriers.marketing[0].logoUrl})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  width: 32,
                  height: 32,
                  mr: 4,
                }}
              />
              <Box display="flex" flexDirection="column">
                <Typography variant="h6">
                  {departure.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  -{' '}
                  {arrival.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                  {!!days && (
                    <Box
                      component="span"
                      sx={{
                        fontSize: 12,
                        fontWeight: 500,
                        lineHeight: '10px',
                        position: 'relative',
                        top: -6,
                        ml: 1,
                      }}
                    >
                      +{days}
                    </Box>
                  )}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {flight.legs[0].carriers.marketing[0].name}
                </Typography>
              </Box>
            </Grid2>
            <Grid2
              container
              size={{ sm: 12, md: 6 }}
              justifyContent="center"
              width="100%"
            >
              <Grid2 size={4}>
                <Box display="flex" flexDirection="column">
                  <Typography variant="h6">
                    {formatMinutes(flight.legs[0].durationInMinutes)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {flight.legs[0].origin.displayCode} -{' '}
                    {flight.legs[0].destination.displayCode}
                  </Typography>
                </Box>
              </Grid2>
              <Grid2 size={4}>
                <Box display="flex" flexDirection="column">
                  {stopCount > 0 && (
                    <Typography variant="h6">
                      {stopCount} {`${stopCount > 1 ? `stops` : 'stop'}`}
                    </Typography>
                  )}
                  {stopCount === 0 && (
                    <Typography variant="h6">Direct</Typography>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    {stopInfo}
                  </Typography>
                </Box>
              </Grid2>
              <Grid2 size={4} alignContent='center'>
                <Typography variant="h6" color='success'
                >{flight.price.formatted}</Typography>
              </Grid2>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
    </Grid2>
  );
}

export default FlightListItem;

{
  /* <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {flight.legs[0].carriers.marketing[0].name ||
                      'Unknown Airline'}
                  </Typography>
                  <Typography variant="body1">
                    {flight.price
                      ? `${flight.price.formatted}`
                      : 'Price not available'}
                  </Typography>
                  <Typography variant="body2">
                    {flight.legs[0].departure
                      ? `${flight.legs[0].departure} - ${
                          flight.legs[flight.legs.length - 1].arrival
                        }`
                      : 'Time details unavailable'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid> */
}
