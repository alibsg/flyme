import {
  Autocomplete,
  CircularProgress,
  debounce,
  Grid2,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AirportResponse } from '../models/airport-response';
import { LocalAirport, LocationCity, Place } from '@mui/icons-material';
import { searchAirport } from '../requests/requests';

interface LocationSearchProps {
  label: string;
  onLocationChange: (value: AirportResponse | null) => void;
}

function LocationSearch({ label, onLocationChange }: LocationSearchProps) {
  const [options, setOptions] = useState<AirportResponse[]>([]);
  const [value, setValue] = useState<AirportResponse | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const renderLocationIcon = useCallback((option: AirportResponse) => {
    switch (option.navigation.entityType) {
      case 'CITY':
        return <LocationCity sx={{ color: 'text.secondary' }} />;
      case 'AIRPORT':
        return <LocalAirport sx={{ color: 'text.secondary' }} />;
      default:
        return <Place sx={{ color: 'text.secondary' }} />;
    }
  }, []);

  const fetch = useMemo(
    () =>
      debounce(
        (input: string, callback: (results: AirportResponse[]) => void) => {
          searchAirport(input).then((value) => callback(value.data));
        },
        400
      ),
    []
  );

  useEffect(() => {
    let active = true;
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      setLoading(false);
      return undefined;
    }
    setLoading(true);
    fetch(inputValue, (results) => {
      if (active) {
        let newOptions: AirportResponse[] = [];
        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [inputValue, value, fetch]);

  return (
    <Autocomplete
      getOptionLabel={(option) =>
        typeof option === 'string'
          ? option
          : option.navigation.localizedName + ' - ' + option.skyId
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      loading={loading}
      loadingText={<CircularProgress size="30px" />}
      noOptionsText="No locations"
      renderInput={(params) => (
        <TextField {...params} label={label} fullWidth />
      )}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        onLocationChange(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Grid2 container sx={{ alignItems: 'center' }}>
              <Grid2 sx={{ display: 'flex', width: 44 }}>
                {renderLocationIcon(option)}
              </Grid2>
              <Grid2
                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
              >
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {option.navigation.localizedName}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {option.navigation.entityType === 'CITY'
                    ? 'All Airports'
                    : option.skyId}
                </Typography>
              </Grid2>
            </Grid2>
          </li>
        );
      }}
    />
  );
}

export default LocationSearch;
