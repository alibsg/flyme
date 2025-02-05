import {
  Autocomplete,
  CircularProgress,
  FilterOptionsState,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { getConfig } from '../requests/requests';
import { Config } from '../models/config-response';

interface CurrencySelectProps {
  label: string;
  onChange: (value: Config | null) => void;
}

function CurrencySelect({ label, onChange }: CurrencySelectProps) {
  const [options, setOptions] = useState<Config[]>([]);
  const [value, setValue] = useState<Config | null>(null);
  const [loading, setLoading] = useState(false);

  const filter = useCallback(
    (allOptions: Config[], state: FilterOptionsState<Config>) => {
      if (state.inputValue === '') {
        return allOptions;
      }

      const query = state.inputValue?.toLowerCase();
      const filtered = allOptions.filter(
        (option) =>
          option.country?.toLowerCase().includes(query) ||
          option.currency?.toLowerCase().includes(query)
      );

      return filtered;
    },
    []
  );

  const setDefault = useCallback(
    (configs: Config[]) => {
      let defaultValue = configs.find((config) =>
        config.country?.toLowerCase().includes('turkey')
      );
      if (!defaultValue) {
        defaultValue = configs[0];
      }
      setValue(defaultValue);
      onChange(defaultValue);
    },
    [onChange]
  );

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await getConfig();
        setOptions(data.data);
        setDefault(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [setDefault]);

  return (
    <Autocomplete
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.currency
      }
      filterOptions={filter}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      loading={loading}
      loadingText={<CircularProgress size="30px" />}
      noOptionsText="Not found"
      renderInput={(params) => (
        <TextField {...params} label={label} fullWidth />
      )}
      onChange={(event, newValue) => {
        setValue(newValue);
        onChange(newValue);
      }}
      getOptionKey={(option) => option.country + option.currency}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {option.country} - {option.currencyTitle}
            </Typography>
          </li>
        );
      }}
    />
  );
}

export default CurrencySelect;
