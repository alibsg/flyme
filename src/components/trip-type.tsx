import { ArrowRightAlt, MultipleStop } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import { useState, MouseEvent } from 'react';

interface TripTypeProps {
  onChange: (value: boolean) => void;
}

function TripType({ onChange }: TripTypeProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const handleOpen = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (isRound: boolean) => {
    setIsRoundTrip(isRound);
    onChange(isRound);
    handleClose();
  };

  return (
    <>
      <Button
        startIcon={isRoundTrip ? <MultipleStop /> : <ArrowRightAlt />}
        onClick={handleOpen}
      >
        {isRoundTrip ? 'Round Trip' : 'One Way'}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            ':hover': { backgroundColor: 'white' },
          }}
          onClick={() => handleSelect(false)}
        >
          One Way
        </MenuItem>
        <MenuItem
          disableRipple
          disableTouchRipple
          sx={{
            ':hover': { backgroundColor: 'white' },
          }}
          onClick={() => handleSelect(true)}
        >
          Round Trip
        </MenuItem>
      </Menu>
    </>
  );
}

export default TripType;
