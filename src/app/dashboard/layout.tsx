import { requireAuth } from '@/auth.utils';
import DashboardContainer from '@/components/DashboardContainer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Gym manager application, Dashboard for activity management',
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireAuth();
  return <DashboardContainer>{children}</DashboardContainer>;
}
