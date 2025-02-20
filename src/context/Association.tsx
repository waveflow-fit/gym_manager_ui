'use client';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import { api } from '@/common/api.utils';
import { MANAGEMENT_ENDPOINTS } from '@/common/apiEndpoints';
import { PAGINATION } from '@/common/constants';
import LS, { LSKeys } from '@/common/ls.utils';
import useToast, { EToastType } from '@/components/Toast/useToast';
import { useNormalizedList } from '@/hooks/useNormalizedList';

export const AssociationCtx = createContext<{
  traineeInvites: string[];
  traineeInvitesById: Record<string, IInvite>;
  isTraineeInvitesLoading: boolean;
  updateTraineeInvite: (id: string, updates: Partial<IInvite>) => void;
  selectedAssociationId: string | null;
  setSelectedAssociationId: Dispatch<SetStateAction<string | null>>;
}>({
  traineeInvites: [],
  traineeInvitesById: {},
  isTraineeInvitesLoading: false,
  updateTraineeInvite: () => {
    throw new Error('Function not implemented.');
  },
  selectedAssociationId: null,
  setSelectedAssociationId: () => {
    throw new Error('Function not implemented.');
  },
});

const Association = ({ children }: { children: React.ReactNode }) => {
  const {
    setList: setTraineeInvites,
    allIds: traineeInvites,
    byId: traineeInvitesById,
    updateItem: updateTraineeInvite,
  } = useNormalizedList<IInvite>([]);
  const [isTraineeInvitesLoading, setIsTraineeInvitesLoading] =
    useState<boolean>(false);
  const { showToast } = useToast();
  const [selectedAssociationId, setSelectedAssociationId] = useState<
    string | null
  >(null);

  useEffect(() => {
    (async () => {
      try {
        setIsTraineeInvitesLoading(true);
        const invites = await api.post<{ limit: number }, { data: IInvite[] }>(
          MANAGEMENT_ENDPOINTS.GET_ALL_INVITES_OF_TRAINEE,
          {
            limit: PAGINATION.LARGE_LIMIT,
          }
        );
        setTraineeInvites(invites.data);
      } catch (e: any) {
        setTraineeInvites([]);
        showToast({ message: e.message, severity: EToastType.ERROR });
      } finally {
        setIsTraineeInvitesLoading(false);
      }
    })();
  }, [setTraineeInvites, showToast]);

  useEffect(() => {
    if (traineeInvites.length <= 0) return;
    const selectFirstInvite = () => {
      const firstInvite = traineeInvites[0];
      LS.setItem<string>(LSKeys.SELECTED_ASSOCIATION, firstInvite);
      setSelectedAssociationId(firstInvite);
    };
    if (!LS.hasItem(LSKeys.SELECTED_ASSOCIATION)) {
      selectFirstInvite();
    } else {
      const savedInviteId = LS.getItem<string>(LSKeys.SELECTED_ASSOCIATION);
      if (savedInviteId && traineeInvitesById[savedInviteId]) {
        setSelectedAssociationId(savedInviteId);
      } else {
        selectFirstInvite();
      }
    }
  }, [traineeInvites, traineeInvitesById]);

  return (
    <AssociationCtx
      value={{
        traineeInvites,
        traineeInvitesById,
        updateTraineeInvite,
        isTraineeInvitesLoading,
        setSelectedAssociationId,
        selectedAssociationId,
      }}
    >
      {children}
    </AssociationCtx>
  );
};

export default Association;
