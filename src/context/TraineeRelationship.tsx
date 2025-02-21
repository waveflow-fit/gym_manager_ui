'use client';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { api } from '@/common/api.utils';
import { MANAGEMENT_ENDPOINTS } from '@/common/apiEndpoints';
import { EInviteStatus, PAGINATION } from '@/common/constants';
import LS, { LSKeys } from '@/common/ls.utils';
import useToast, { EToastType } from '@/components/Toast/useToast';
import { useNormalizedList } from '@/hooks/useNormalizedList';

export const TraineeRelationshipCtx = createContext<{
  traineeInvites: string[];
  traineeInvitesById: Record<string, IInvite>;
  isTraineeInvitesLoading: boolean;
  updateTraineeInviteStatus: (id: string, updatedStatus: EInviteStatus) => void;

  associations: string[];
  associationsById: Record<string, IAssociation>;
  isAssociationsLoading: boolean;

  selectedAssociationId: string | null;
  setSelectedAssociationId: Dispatch<SetStateAction<string | null>>;
}>({
  traineeInvites: [],
  traineeInvitesById: {},
  isTraineeInvitesLoading: false,
  updateTraineeInviteStatus: () => {
    throw new Error('Out of context');
  },

  associations: [],
  associationsById: {},
  isAssociationsLoading: false,

  selectedAssociationId: null,
  setSelectedAssociationId: () => {
    throw new Error('Out of context');
  },
});

const TraineeRelationship = ({ children }: { children: React.ReactNode }) => {
  const {
    setList: setTraineeInvites,
    allIds: traineeInvites,
    byId: traineeInvitesById,
    updateItem: updateTraineeInvite,
    isListLoading: isTraineeInvitesLoading,
    setIsListLoading: setIsTraineeInvitesLoading,
  } = useNormalizedList<IInvite>([]);
  const {
    setList: setAssociations,
    allIds: associations,
    byId: associationsById,
    isListLoading: isAssociationsLoading,
    setIsListLoading: setIsAssociationLoading,
  } = useNormalizedList<IAssociation>([]);
  const [reFetchAssociation, setRefetchAssociations] = useState(true);

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
  }, [setIsTraineeInvitesLoading, setTraineeInvites, showToast]);

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

  useEffect(() => {
    if (!reFetchAssociation) return;
    try {
      setIsAssociationLoading(true);
    } catch (e: any) {
      setAssociations([]);
      showToast({ message: e.message, severity: EToastType.ERROR });
    } finally {
      setIsAssociationLoading(false);
      setRefetchAssociations(false);
    }
  }, [reFetchAssociation, setAssociations, setIsAssociationLoading, showToast]);

  const updateTraineeInviteStatus = useCallback(
    (id: string, updatedStatus: EInviteStatus) => {
      updateTraineeInvite(id, { invite_status: updatedStatus });
    },
    [updateTraineeInvite]
  );

  return (
    <TraineeRelationshipCtx
      value={{
        traineeInvites,
        traineeInvitesById,
        updateTraineeInviteStatus,
        isTraineeInvitesLoading,

        associations,
        associationsById,
        isAssociationsLoading,

        setSelectedAssociationId,
        selectedAssociationId,
      }}
    >
      {children}
    </TraineeRelationshipCtx>
  );
};

export default TraineeRelationship;
