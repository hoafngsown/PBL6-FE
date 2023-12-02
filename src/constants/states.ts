import { AdminInfo } from "@/types/auth";

import { atom } from "recoil";

export const currentUserState = atom<Partial<AdminInfo>>({
  key: "currentUserState",
  default: null,
});

export const states = {};
