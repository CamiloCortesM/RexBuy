import { FC } from 'react';
import { Box, Button } from '@mui/material';

import './ItemSelector.module.css';

type Props = {
  onSelectedSize: (value: string, name: string) => void;
  selectedItem? : string | string[];
  items         : string[];
  itemName      : string;
}

export const ItemSelector: FC<Props> = ({
  selectedItem,
  items,
  onSelectedSize,
  itemName,
}) => {
  return (
    <Box>
      {items.map((item) => (
        <Button
          key={item}
          size="small"
          color={selectedItem === item ? 'secondary' : 'info'}
          className={selectedItem === item ? 'btn-item-selected' : ''}
          onClick={() => onSelectedSize(item, itemName)}
        >
          {item}
        </Button>
      ))}
    </Box>
  );
};
