import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { DashboardOutlined } from '@mui/icons-material';

import { DashboardSkeleton, DashboardSummary } from '@/components/admin';
import { AdminLayout } from '@/components/layouts';
import { DashboardSummaryResponse } from '@/interfaces';

const DashboardPage = () => {
  const { data, isLoading } = useSWR<DashboardSummaryResponse>(
    '/api/admin/dashboard',
    {
      refreshInterval: 30 * 1000, // 30 seconds
    }
  );

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading)
    return (
      <AdminLayout
        title="Dashboard"
        subTitle="Estadisticas generales"
        icon={<DashboardOutlined />}
      >
        <DashboardSkeleton numCycles={8} />
      </AdminLayout>
    );

  if (!data) return;
  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Estadisticas generales"
      icon={<DashboardOutlined />}
    >
      <DashboardSummary data={data} refreshIn={refreshIn} />
    </AdminLayout>
  );
};

export default DashboardPage;
