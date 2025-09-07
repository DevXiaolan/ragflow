import { useFastPass } from '@/hooks/login-hooks';
import { Spin } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet } from 'umi';

export default () => {
  console.log('====fast-pass====');
  const { login: fastPass } = useFastPass();
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const token = url.searchParams.get('eteams_token');
      if (token) {
        setProcessing(true);
        Promise.resolve(fastPass({ eteams_token: token })).finally(() => {
          url.searchParams.delete('eteams_token');
          window.history.replaceState({}, '', url.toString());
          setProcessing(false);
        });
      }
    } catch (e) {
      // ignore
    }
  }, [fastPass]);

  if (processing) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Spin />
      </div>
    );
  }

  return <Outlet />;
};
