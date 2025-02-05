import { Add, Person, Remove } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';

export type PassengersCount = {
  adults: number;
  children: number;
  infants: number;
};

interface PassengersSelectProps {
  onChange: (passengers: PassengersCount) => void;
}

function PassengersSelect({ onChange }: PassengersSelectProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const menuItems: [string, number, Dispatch<SetStateAction<number>>][] = [
    ['Adults', adults, setAdults],
    ['Children (2-11)', children, setChildren],
    ['Infants', infants, setInfants],
  ];

  const handlePassengerClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePassengerClose = () => {
    setAnchorEl(null);
  };

  const handlePassengerCancel = () => {
    handlePassengerClose();
  };

  const handlePassengerConfirm = () => {
    onChange({
      adults,
      children,
      infants,
    });
    handlePassengerClose();
  };

  return (
    <>
      <Button startIcon={<Person />} onClick={handlePassengerClick}>
        Passengers: {adults + children + infants}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handlePassengerClose}
      >
        {menuItems.map(([label, count, setCount]) => (
          <MenuItem
            key={label as string}
            disableRipple
            disableTouchRipple
            sx={{
              ':hover': { backgroundColor: 'white' },
            }}
          >
            <Typography sx={{ flexGrow: 1 }} color="text.secondary">
              {label}
            </Typography>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setCount(Math.max(0, count - 1));
              }}
              disabled={count === 0}
            >
              <Remove />
            </IconButton>
            <Typography color="text.secondary">{count}</Typography>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                setCount(count + 1);
              }}
            >
              <Add />
            </IconButton>
          </MenuItem>
        ))}
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            ':hover': { backgroundColor: 'white' },
          }}
        >
          <Box display="flex" justifyContent="end" width="100%">
            <Button onClick={handlePassengerCancel}>Cancel</Button>
            <Button onClick={handlePassengerConfirm}>Done</Button>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
}

export default PassengersSelect;
