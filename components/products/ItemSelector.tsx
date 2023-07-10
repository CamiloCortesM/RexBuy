import { FC } from 'react';
import { Box, Button } from '@mui/material';

import styles from './ItemSelector.module.css';

interface Props {
  selecteditem?: string;
  items: string[];
}

export const ItemSelector: FC<Props> = ({ selecteditem, items }) => {
  return (
    <Box>
      {items.map((item) => (
        <Button
          key={item}
          size="small"
          color={selecteditem === item ? 'primary' : 'info'}
          className={selecteditem === item ? styles['btn-item-selected'] : ''}
        >
          {item}
        </Button>
      ))}
    </Box>
  );
};
