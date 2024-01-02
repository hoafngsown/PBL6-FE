import { EProjectInvitationStatus, EProjectRole } from "@/constants/project";

export interface IProject {
  created_at: Date;
  id: string;
  title: string;
  description: string;
}

export interface IRole {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null,
  projectId: string,
  userId: string,
  role: EProjectRole,
  roleInvited: EProjectRole,
  status: EProjectInvitationStatus
}