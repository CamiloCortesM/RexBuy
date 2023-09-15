import { FC } from 'react';

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { AutoAwesome, Grade } from '@mui/icons-material';

export const ListItemBenefits: FC = () => {
  const elementos = [
    {
      primary: 'Variedad de Productos',
      secondary:
        'Ofrecemos una amplia selección de productos tecnológicos de alta calidad.',
      icon: <CategoryIcon />,
    },

    {
      primary: 'Navegación Intuitiva',
      secondary:
        'Experimenta una navegación fácil y una experiencia de compra intuitiva en nuestra plataforma.',
      icon: <AutoAwesome />,
    },
    {
      primary: 'Productos de ultima generación',
      secondary:
        'Mantente actualizado con nuestras actualizaciones regulares sobre nuevos productos',
      icon: <Grade />,
    },
  ];

  return (
    <>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {elementos.map((elemento, i) => (
          <ListItem key={i} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: '#f7bd8f' }}>
                {elemento.icon}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={elemento.primary}
              secondary={
                <Typography fontSize=".8rem" variant="body1">
                  {elemento.secondary}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </>
  );
};
