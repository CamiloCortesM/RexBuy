import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { Avatar, Badge, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import { rexbuyApi } from '@/api';
import { IUser } from '@/interfaces';

type Props = {
  user: IUser;
  updateUser: Function;
};

export const UserImage: FC<Props> = ({ user, updateUser }) => {
  const [selectImage, setSelectImage] = useState<File | null>(null);
  const { update } = useSession();
  const [successfully, setSuccessfully] = useState(false);

  useEffect(() => {}, [user.userImage]);

  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 25,
    height: 25,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: '2px',
  }));

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setSelectImage(e.target.files[0]);

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    try {
      setSuccessfully(true);
      const { data } = await rexbuyApi.post<{ message: string }>(
        '/upload',
        formData
      );

      const info = { userImage: data.message };
      const { data: dataUser } = await rexbuyApi.put<{ updatedUser: IUser }>(
        '/user',
        info
      );
      
      const user: IUser = dataUser.updatedUser;
      const { email } = user;

      await updateUser(user);
      await update({ email });
      setSuccessfully(false);
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <Button
        className={successfully ? 'pulse circle' : ''}
        component="label"
        style={{ height: '62px', borderRadius: '50%', width: '62px' }}
      >
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp, image/jpg"
          hidden
          onChange={handleImageChange}
        />

        <Stack
          direction="row"
          spacing={2}
          height="72px"
          width="72px"
          sx={{
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '50%',
            backgroundColor: '#fff',
          }}
          alignItems="center"
          justifyContent="center"
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <SmallAvatar
                alt="Add Image"
                src="/profile/camera.svg"
                style={{ backgroundColor: '#fff' }}
              />
            }
          >
            <Avatar
              alt="User Image"
              src={
                selectImage
                  ? URL.createObjectURL(selectImage)
                  : user.userImage || '/profile/default-profile.svg'
              }
              sx={{ width: 70, height: 70 }}
            />
          </Badge>
        </Stack>
      </Button>
    </>
  );
};
