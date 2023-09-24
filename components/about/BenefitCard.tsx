import { FC } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

type Props = {
    title      :string,
    imageSrc   :string,
    description:string;
}

export const BenefitCard:FC<Props> = ({ title, imageSrc, description }) => {
    return (
      <Grid
        item
        xs={12}
        md={5}
        margin="20px 40px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography fontSize="1.3rem" textAlign="center">
          {title}
        </Typography>
        <Box height="100px">
          <Image src={imageSrc} alt={title} style={{ height: '100%' }} />
        </Box>
        <Box width="80%">
          <Typography textAlign="center">{description}</Typography>
        </Box>
      </Grid>
    );
  };