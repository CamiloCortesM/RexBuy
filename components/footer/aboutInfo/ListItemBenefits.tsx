import { FC } from 'react';

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';

import { aboutElements } from '@/constants';

export const ListItemBenefits: FC = () => {
  return (
    <>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {aboutElements.map((element, i) => (
          <ListItem key={i} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: '#f7bd8f' }}>
                {element.icon}
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
        ))}
      </List>
    </>
  );
};
