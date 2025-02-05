import { FlightClass } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState, MouseEvent } from 'react';

interface TripClassProps {
  onChange: (value: TripTypes) => void;
}

export type TripTypes = 'economy' | 'premium_economy' | 'business' | 'first';

function TripClass({ onChange }: TripClassProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [tripType, setTripType] = useState<string>('Economy');

  const handleOpen = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (tripClass: TripTypes, title: string) => {
    setTripType(title);
    onChange(tripClass);
    handleClose();
  };

  const items: [string, TripTypes][] = [
    ['Economy', 'economy'],
    ['Premium Economy', 'premium_economy'],
    ['Business', 'business'],
    ['First', 'first'],
  ];

  return (
    <>
      <Button startIcon={<FlightClass />} onClick={handleOpen}>
        {tripType}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {items.map(([title, value]) => (
          <MenuItem
            disableRipple
            disableTouchRipple
            sx={{
              ':hover': { backgroundColor: 'white' },
            }}
            key={title}
            onClick={() => handleSelect(value, title)}
          >
            {title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default TripClass;
