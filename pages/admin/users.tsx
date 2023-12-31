import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbar,
} from '@mui/x-data-grid';
import { PeopleOutline } from '@mui/icons-material';
import { Avatar, Grid, MenuItem, Select } from '@mui/material';

import { rexbuyApi } from '@/axios';
import { AdminLayout } from '@/components/layouts';
import { IUser } from '@/interfaces';
import { AlertErrorMessage } from '@/components/auth';
import { AuthContext } from '@/context';
import { TableSkeleton } from '@/components/admin';

const defaultImage = '/profile/default-profile.svg';

const UsersPage = () => {
  const { data, isLoading } = useSWR<IUser[]>('/api/admin/users');
  const [users, setUsers] = useState<IUser[]>([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (isLoading)
    return (
      <AdminLayout
        title={'Usuarios'}
        subTitle={'Mantenimiento de usuarios'}
        icon={<PeopleOutline />}
      >
        <TableSkeleton />
      </AdminLayout>
    );

  const onRoleUpdated = async (userId: string, newRole: string) => {
    if (user?.role !== 'admin') {
      setErrorMessage('Privilegios insuficientes para esta funcionalidad');
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
      return;
    }

    const previousUsers = users.map((user) => ({ ...user }));
    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));

    setUsers(updatedUsers);

    try {
      await rexbuyApi.put('/admin/users', { userId, role: newRole });
    } catch (error) {
      console.log(error);
      setUsers(previousUsers);
      setErrorMessage('Error del servidor al actualizar el usuario');
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 60,
      renderCell: ({ row }: GridRenderCellParams) => {
        const userImage = row.avatar || defaultImage;
        return <Avatar src={userImage} alt="user-image" />;
      },
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'email',
      headerName: 'Correo',
      width: 250,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'name',
      headerName: 'Nombre completo',
      width: 300,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'role',
      headerName: 'Rol',
      width: 300,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            value={row.role}
            label="Rol"
            sx={{ width: '300px' }}
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="client">Client</MenuItem>
          </Select>
        );
      },
      headerAlign: 'center',
      align: 'center',
    },
  ];

  const rows = users!.map((user) => ({
    id    : user._id,
    email : user.email,
    name  : user.name,
    role  : user.role,
    avatar: user.userImage,
  }));

  return (
    <AdminLayout
      title={'Usuarios'}
      subTitle={'Mantenimiento de usuarios'}
      icon={<PeopleOutline />}
    >
      <AlertErrorMessage
        errorMessage={errorMessage}
        showError={showError}
        setOpen={setShowError}
      />
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 440, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            localeText={{
              toolbarDensity: 'Size',
              toolbarDensityLabel: 'Size',
              toolbarDensityCompact: 'Small',
              toolbarDensityStandard: 'Medium',
              toolbarDensityComfortable: 'Large',
            }}
            slots={{
              toolbar: GridToolbar,
            }}
            checkboxSelection
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
