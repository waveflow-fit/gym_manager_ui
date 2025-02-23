export const USER_ENDPOINTS = Object.freeze({
  GOOGLE_SIGN_IN: '/user/google-sign-in',
  GET_USER_SESSION: '/user/get-session',
  USER_LOGOUT: '/user/logout',
  USER_SAVE_ONBOARDING_DETAILS: '/user/onboarding-details',
});

export const MANAGEMENT_ENDPOINTS = Object.freeze({
  SEND_INVITE: '/management/send-invite',
  GET_ALL_PENDING_INVITES: '/management/get-all-invites-of-trainer',
  DELETE_INVITE: '/management/delete-invite/:inviteId',
  GET_ALL_INVITES_OF_TRAINEE: '/management/get-all-invites-of-trainee',
  GET_ALL_ASSOCIATION_FOR_TRAINEE: '/management/get-all-association-of-trainee',
  ACCEPT_INVITE: (inviteId: string) => `/management/accept-invite/${inviteId}`,
  REJECT_INVITE: (inviteId: string) => `/management/reject-invite/${inviteId}`,
});
