'use client';

import { createContext, useCallback, useContext, useState } from 'react';

import { API_KEYS } from '@/common/constants';

const initialValues = {
  [API_KEYS.PENDING_TRAINEE_INVITES_DASHBOARD]: 0,
};
const ApiRefresherCtx = createContext<{
  apiRefresh: Record<API_KEYS, number>;
  refreshApi: (apiKeyToRefresh: API_KEYS) => Record<API_KEYS, number>;
}>({
  apiRefresh: initialValues,
  refreshApi: (_apiKeyToRefresh: API_KEYS) => {
    return initialValues as Record<API_KEYS, number>;
  },
});

const ApiRefresher = ({ children }: { children: React.ReactNode }) => {
  const [apiRefresh, setApiRefresh] =
    useState<Record<API_KEYS, number>>(initialValues);
  const refreshApi = useCallback(
    (apiKeyToRefresh: API_KEYS) => {
      const updatedState = {
        ...apiRefresh,
        [apiKeyToRefresh]: (apiRefresh[apiKeyToRefresh] || 0) + 1,
      };
      setApiRefresh(updatedState);
      return updatedState;
    },
    [apiRefresh]
  );
  return (
    <ApiRefresherCtx value={{ apiRefresh, refreshApi }}>
      {children}
    </ApiRefresherCtx>
  );
};

export const useApiRefresher = (apiKey: API_KEYS) => {
  const ctx = useContext(ApiRefresherCtx);
  if (!ctx) {
    throw new Error('ApiRefresherProvider wrapper missing');
  }
  const refreshApi = useCallback(() => ctx.refreshApi(apiKey), [apiKey, ctx]);
  return {
    refreshApi,
    isApiRefreshed: ctx.apiRefresh[apiKey],
  };
};

export default ApiRefresher;
