export enum EUserRole {
  TRAINER = 'TRAINER',
  TRAINEE = 'TRAINEE',
}
export enum EInviteStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export enum API_KEYS {
  PENDING_TRAINEE_INVITES_DASHBOARD = 'get-pending-trainee-invite-dashboard',
}

export enum PAGINATION {
  DEFAULT_LIMIT = 20,
  START_OFFSET = 0,
}

export enum EQuickWidgets {
  ADD_NEW_TRAINEE_BUTTON = 'add-new-trainee-button',
  ALL_TRAINEE_LIST = 'all-trainee-list',
}

export const availableWidgetsOptions = [
  {
    value: EQuickWidgets.ADD_NEW_TRAINEE_BUTTON,
    label: 'Add new trainee',
  },
  {
    value: EQuickWidgets.ALL_TRAINEE_LIST,
    label: 'Trainee list',
  },
];
