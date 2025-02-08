export enum USER_ENDPOINTS {
  ROOT = '/user',
  GOOGLE_SIGN_IN = `${USER_ENDPOINTS.ROOT}/google-sign-in`,
  GET_USER_SESSION = `${USER_ENDPOINTS.ROOT}/get-session`,
  USER_LOGOUT = `${USER_ENDPOINTS.ROOT}/logout`,
  USER_SAVE_ONBOARDING_DETAILS = `${USER_ENDPOINTS.ROOT}/onboarding-details`,
}

export enum MANAGEMENT_ENDPOINTS {
  ROOT = '/management',
  SEND_INVITE = `${MANAGEMENT_ENDPOINTS.ROOT}/send-invite`,
}

export enum MANAGEMENT_ENDPOINT {
  ROOT = '/management',
  SEND_INVITE = `${MANAGEMENT_ENDPOINTS.ROOT}/send-invite`,
  GET_ALL_PENDING_INVITES = `${MANAGEMENT_ENDPOINTS.ROOT}/get-all-invites-of-trainer`,
  DELETE_INVITE = `${MANAGEMENT_ENDPOINTS.ROOT}/delete-invite/:inviteId`,
}
