import { ElementType, FC } from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

type Props = {
    element:{primary:string,secondary:string};
    icon:ElementType;
}

export const ListItemWithIcon: FC<Props> = ({
    element,
    icon: IconComponent,
  }) => (
    <ListItem alignItems="flex-start">
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