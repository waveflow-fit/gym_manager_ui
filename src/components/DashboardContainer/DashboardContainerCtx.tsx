'use client';

import { createContext } from 'react';

export const DashboardContainerCtx = createContext({
  isSidebarOpen: true,
  setIsSidebarOpen: (isOpen: boolean) => {},
});
