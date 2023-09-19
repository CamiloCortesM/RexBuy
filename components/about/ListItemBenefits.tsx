import { FC } from 'react';

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { AutoAwesome, Grade, Category } from '@mui/icons-material';

import { aboutElements } from '@/constants';

const elementsIcons = [Category, AutoAwesome, Grade];

export const ListItemBenefits: FC = () => {
  return (
    <>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {aboutElements.map((element, i) => {
          const IconComponent = elementsIcons[i];
          return (
            <ListItem key={i} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: '#00306d' }}>
                  <IconComponent />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={element.primary}
                secondary={
                  <Typography fontSize=".8rem" variant="body1">
                    {element.secondary}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
