export const USER_ENDPOINTS = Object.freeze({
  GOOGLE_SIGN_IN: '/user/google-sign-in',
  GET_USER_SESSION: '/user/get-session',
  USER_LOGOUT: '/user/logout',
  USER_SAVE_ONBOARDING_DETAILS: '/user/onboarding-details',
});

export const MANAGEMENT_TRAINER_ENDPOINTS = Object.freeze({
  SEND_INVITE: '/management/trainer/send-invite',
  GET_ALL_PENDING_INVITES: '/management/trainer/get-all-invites',
  DELETE_INVITE: '/management/trainer/delete-invite/:inviteId',
  GET_ALL_ASSOCIATION: '/management/trainer/get-all-association',
});

export const MANAGEMENT_TRAINEE_ENDPOINTS = Object.freeze({
  GET_ALL_INVITES: '/management/trainee/get-all-invites',
  GET_ALL_ASSOCIATION: '/management/trainee/get-all-association',
  ACCEPT_INVITE: (inviteId: string) =>
    `/management/trainee/accept-invite/${inviteId}`,
  REJECT_INVITE: (inviteId: string) =>
    `/management/trainee/reject-invite/${inviteId}`,
});
