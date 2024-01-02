export enum EProjectRole {
  OWNER = "owner",
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest"
}

export enum EProjectInvitationStatus {
  ACCEPTED = 'accepted',
  WAITING = 'waiting',
  REJECT = 'reject',
}

export const ROLE_OPTIONS = [
  {
    label: "OWNER",
    value: EProjectRole.OWNER
  },
  {
    label: "ADMIN",
    value: EProjectRole.ADMIN
  },
  {
    label: "USER",
    value: EProjectRole.USER
  },
  {
    label: "GUEST",
    value: EProjectRole.GUEST
  },
]
