import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface DashboardRootLayoutProps {
  children: React.ReactNode;
}

const DashboardRootLayout: React.FC<DashboardRootLayoutProps> = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardRootLayout;