import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { PeopleOutline } from '@mui/icons-material';
import { Grid, MenuItem, Select } from '@mui/material';

import { rexbuyApi } from '@/api';
import { AdminLayout } from '@/components/layouts';
import { IUser } from '@/interfaces';

const UsersPage = () => {
  const { data, error, isLoading } = useSWR<IUser[]>('/api/admin/users');
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if ((!data && !error) || isLoading) return <></>;

  const onRoleUpdated = async (userId: string, newRole: string) => {
    const previosUsers = users.map((user) => ({ ...user }));
    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));

    setUsers(updatedUsers);

    try {
      await rexbuyApi.put('/admin/users', { userId, role: newRole });
    } catch (error) {
      console.log(error);
      setUsers(previosUsers);
      //TODO: cambiar las alertas
      alert('No se pudo actualizar el role del usuario');
    }
  };

  const columns: GridColDef[] = [
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'name', headerName: 'Nombre completo', width: 300 },
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
    },
  ];

  const rows = users!.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout
      title={'Usuarios'}
      subTitle={'Mantenimiento de usuarios'}
      icon={<PeopleOutline />}
    >
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 440, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} autoPageSize />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;