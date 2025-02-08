import { ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Metadata } from 'next';

import ApiRefresher from '@/components/ApiRefresher';
import ToastProvider from '@/components/Toast/ToastProvider';
import theme from '@/theme';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gym manager',
  description:
    'Gym manager application, helps you to manage you daily gym activities',
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en'>
      <body>
        <ToastProvider>
          <AppRouterCacheProvider>
            <ApiRefresher>
              <ThemeProvider theme={theme}>{children}</ThemeProvider>
            </ApiRefresher>
          </AppRouterCacheProvider>
        </ToastProvider>
      </body>
    </html>
  );
};
export default RootLayout;
