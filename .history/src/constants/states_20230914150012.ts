import { AdminInfo } from "@/types/auth"

import { atom } from "recoil"

export const currentUserState = atom<AdminInfo>({
  key: "currentUserState",
  default: null,
})

export const states = {}
