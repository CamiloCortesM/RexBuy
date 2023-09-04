import { FC } from 'react';
import { Box, Button } from '@mui/material';

import styles from './ItemSelector.module.css';

type Props = {
  selecteditem?: string | string[];
  items: string[];
  onSelectedSize: (value: string, name: string) => void;
  itemName: string;
}

export const ItemSelector: FC<Props> = ({
  selecteditem,
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
          color={selecteditem === item ? 'primary' : 'info'}
          className={selecteditem === item ? styles['btn-item-selected'] : ''}
          onClick={() => onSelectedSize(item, itemName)}
        >
          {item}
        </Button>
      ))}
    </Box>
  );
};
