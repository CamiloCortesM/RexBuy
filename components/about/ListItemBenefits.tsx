import { FC } from 'react';

import {
  List,
} from '@mui/material';
import { AutoAwesome, Grade, Category } from '@mui/icons-material';

import { ABOUT_ELEMENTS } from '@/constants';
import { ListItemWithIcon } from './ListItemWithIcon';

const elementsIcons = [Category, AutoAwesome, Grade];

export const ListItemBenefits: FC = () => {
  return (
    <List sx={{ width: '100%', maxWidth: 360 }}>
      {ABOUT_ELEMENTS.map((element, i) => {
        const IconComponent = elementsIcons[i];
        return <ListItemWithIcon key={i} element={element} icon={IconComponent} />;
      })}
    </List>
  );
};
