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
  LARGE_LIMIT = 100,
}
