import { FC, useState } from 'react';

import { Grid, Typography } from '@mui/material';

import { MESSAGE_STYLE, SCROLLBAR_STYLES } from '@/constants';

type Props = {
  messages: { role: string; content: string }[];
  isLoading: boolean;
};

export const Conversation: FC<Props> = ({ messages, isLoading }) => {
  const [displayMessages, setDisplayMessages] = useState<
    { role: string; content: string }[]
  >([]);

  return (
    <Grid
      container
      display="flex"
      flexDirection="column"
      height="85%"
      flexWrap="nowrap"
      sx={SCROLLBAR_STYLES}
    >
      {messages.map((message, index) =>
        message.role === 'assistant' ? (
          <Grid item key={index}>
            <Typography
              variant="body1"
              component="p"
              sx={MESSAGE_STYLE}
              style={{ backgroundColor: '#005467' }}
            >
              {message.content}
            </Typography>
          </Grid>
        ) : (
          <Grid item key={index} paddingRight="10px">
            <Grid
              item
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              width="100%"
            >
              <Typography
                variant="body1"
                component="p"
                sx={MESSAGE_STYLE}
                style={{ backgroundColor: '#f85d6f' }}
              >
                {message.content}
              </Typography>
            </Grid>
          </Grid>
        )
      )}
      {isLoading && (
        <Grid item>
          <Typography
            variant="body1"
            style={{ backgroundColor: '#005467' }}
            component="p"
            sx={MESSAGE_STYLE}
          >
            ...
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
