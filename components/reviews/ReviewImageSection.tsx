import { ChangeEvent, FC } from 'react';
import { LoadingButton } from '@mui/lab';
import { UseFormWatch } from 'react-hook-form';
import { CameraAltOutlined, CloseRounded } from '@mui/icons-material';
import {
    Box,
    Card,
    CardMedia,
    Grid,
    IconButton,
    Typography,
    styled,
} from '@mui/material';
import { ReviewData } from '@/interfaces';

type Props = {
  title: string;
  isUpload: boolean;
  watch: UseFormWatch<ReviewData>;
  onDeleteImage: (arg0: string) => void;
  handleFileChange: ({
    target,
  }: ChangeEvent<HTMLInputElement>) => Promise<void>;
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const ReviewImageSection: FC<Props> = ({
  onDeleteImage,
  title,
  watch,
  isUpload,
  handleFileChange,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      width={{ sm: '100%', md: 700 }}
      sx={{
        backgroundColor: 'white',
        margin: '0 auto 30px',
        boxShadow: '0px 3px 4px #0000001c',
        padding: { xs: '20px 10px 30px', sm: '20px 50px 30px' },
      }}
    >
      <Typography
        variant="h2"
        component="h2"
        mt={3}
        mb={1}
        fontSize="1.5rem"
        fontWeight="600"
        textAlign="center"
      >
        Comparte fotos de tu producto
      </Typography>
      <Typography variant="caption" color="#737373" mb={4}>
        (Opcional)
      </Typography>

      <Grid container spacing={2} mb={2}>
        {watch('images').map((img, i) => (
          <Grid item xs={6} sm={3} key={img}>
            <Card
              sx={{
                position: 'relative',
              }}
            >
              <IconButton
                onClick={() => onDeleteImage(img)}
                aria-label="delete"
                size="small"
                color="error"
                sx={{
                  position: 'absolute',
                  zIndex: 1,
                }}
              >
                <CloseRounded fontSize="small" />
              </IconButton>
              <CardMedia
                component="img"
                className="fadeIn"
                height={150}
                sx={{
                  objectFit: 'contain',
                }}
                image={img}
                alt={`review ${title} #${i}`}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      <LoadingButton
        loading={isUpload}
        loadingPosition="start"
        component="label"
        variant="outlined"
        color="primary"
        startIcon={<CameraAltOutlined />}
      >
        {isUpload ? 'Subiendo Imagenes' : 'Subir Imagenes'}
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          multiple
          accept="image/png, image/gif, image/jpeg"
        />
      </LoadingButton>
    </Box>
  );
};
