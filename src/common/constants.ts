export enum EUserRole {
  TRAINER = 'TRAINER',
  TRAINEE = 'TRAINEE',
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
